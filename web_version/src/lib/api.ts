import { AuthResponse, Booking, Station, Train, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to get the auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function for making API requests
async function apiRequest<T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any, 
  customHeaders?: Record<string, string>,
  isFormData: boolean = false
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  // Prepare headers
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...customHeaders
  };
  
  // Add content-type header if not form data
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  // Add authorization header if token exists
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Prepare request options - For a dump project, we'll try both approaches
  const options: RequestInit = {
    method,
    headers,
    credentials: endpoint.includes('/login') || endpoint.includes('/register') ? 'include' : 'same-origin',
    // For authentication endpoints, we try with credentials
    // For other endpoints, we use same-origin to avoid CORS issues
  };
  
  // Add body for non-GET requests
  if (method !== 'GET' && data) {
    options.body = isFormData ? data : JSON.stringify(data);
  }
  
  // Make the request
  const response = await fetch(url, options);
  
  // Handle response
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw { 
      response: { 
        status: response.status, 
        data: errorData 
      } 
    };
  }
  
  // Return JSON response or empty object if no content
  return response.status !== 204 ? await response.json() : {} as T;
}

export const authService = {
  async register(name: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/register', 'POST', {
      name,
      email,
      password,
      password_confirmation,
    });
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Try with normal API request first
      return await apiRequest<AuthResponse>('/login', 'POST', {
        email,
        password,
      });
    } catch (error) {
      // If CORS is the issue, try a direct fetch with different credentials mode
      console.log("Trying alternative login method due to possible CORS issue");
      const url = `${API_URL}/login`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'omit', // Try without credentials to avoid CORS preflight with credentials
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { response: { status: response.status, data: errorData } };
      }
      
      const data = await response.json();
      return data;
    }
  },

  async logout(): Promise<void> {
    await apiRequest<void>('/logout', 'POST');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getUser(id?: string): Promise<User> {
    const url = id ? `/user/${id}` : '/user';
    const response = await apiRequest<{user: User}>(url);
    return response.user;
  },
};

export const trainService = {
  async getAllTrains(): Promise<Train[]> {
    const response = await apiRequest<{trains: Train[]}>('/trains/all');
    return response.trains;
  },

  async getPromoTrains(): Promise<Train[]> {
    return apiRequest<Train[]>('/trains/promo');
  },

  async searchTrains(departureStationId: number, arrivalStationId: number, date: string): Promise<Train[]> {
    // Create query string manually for GET request with params
    const queryParams = new URLSearchParams({
      departure_station: departureStationId.toString(),
      arrival_station: arrivalStationId.toString(),
      date,
    }).toString();
    
    const response = await apiRequest<{trains: Train[]}>(`/trains/search?${queryParams}`);
    return response.trains;
  },

  async getAvailableSeats(trainId: number, date: string): Promise<string[]> {
    const queryParams = new URLSearchParams({ date }).toString();
    const response = await apiRequest<{available_seats: string[]}>(`/trains/${trainId}/available-seats?${queryParams}`);
    return response.available_seats;
  },
};

export const stationService = {
  async getAllStations(): Promise<Station[]> {
    return apiRequest<Station[]>('/stations');
  },
};

export const bookingService = {
  async createBooking(bookingData: {
    user_uuid: string;
    train_id: number;
    travel_date: string;
    passenger_name: string;
    passenger_id_number: string;
    passenger_dob: string;
    passenger_gender: 'male' | 'female';
    payment_method: string;
    seat_number: string;
  }): Promise<Booking> {
    return apiRequest<Booking>('/bookings', 'POST', bookingData);
  },

  async getBookingHistory(): Promise<Booking[]> {
    // Get user_uuid from localStorage
    let user_uuid = '';
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          user_uuid = user.uuid;
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
    
    // Add user_uuid as query parameter
    const queryParams = new URLSearchParams({ user_uuid }).toString();
    return apiRequest<Booking[]>(`/bookings/history?${queryParams}`);
  },

  async updateBookingStatus(transactionId: string, status: string): Promise<Booking> {
    return apiRequest<Booking>(`/bookings/${transactionId}/status`, 'PUT', { status });
  },
  async uploadPaymentProof(bookingId: number, file: File): Promise<Booking> {
    const formData = new FormData();
    formData.append('proof', file);
    
    return apiRequest<Booking>(`/payments/${bookingId}/upload`, 'POST', formData, {}, true);
  },
};
