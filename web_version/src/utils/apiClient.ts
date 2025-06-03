'use client';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface AuthData {
  token: string;
  user: any;
  expiresAt: number;
  refreshToken?: string;
}

class ApiClient {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  constructor(baseURL?: string) {
    this.api = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout for Cloud Run
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = this.getValidToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor with retry logic
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle network errors
        if (!error.response) {
          console.error('Network error:', error.message);
          return Promise.reject({
            message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
            statusCode: 0,
            networkError: true
          });
        }

        // Handle 401 errors with token refresh
        if (error.response.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.api(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshed = await this.refreshToken();
            
            if (refreshed) {
              // Process failed queue
              this.processQueue(null);
              // Retry original request
              return this.api(originalRequest);
            } else {
              // Refresh failed, clear auth and redirect
              this.processQueue(error);
              this.handleAuthFailure();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            this.processQueue(refreshError);
            this.handleAuthFailure();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle other HTTP errors
        const errorMessage = this.getErrorMessage(error);
        return Promise.reject({
          message: errorMessage,
          statusCode: error.response.status,
          originalError: error
        });
      }
    );
  }

  private processQueue(error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    this.failedQueue = [];
  }

  private getErrorMessage(error: AxiosError): string {
    if (error.response?.data) {
      const data = error.response.data as any;
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (typeof data === 'string') return data;
    }

    switch (error.response?.status) {
      case 400:
        return 'Permintaan tidak valid';
      case 401:
        return 'Sesi Anda telah berakhir. Silakan login kembali.';
      case 403:
        return 'Anda tidak memiliki akses untuk melakukan tindakan ini';
      case 404:
        return 'Data yang dicari tidak ditemukan';
      case 422:
        return 'Data yang dikirim tidak valid';
      case 429:
        return 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
      case 500:
        return 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
      case 502:
      case 503:
      case 504:
        return 'Server sedang tidak tersedia. Silakan coba lagi nanti.';
      default:
        return 'Terjadi kesalahan yang tidak diketahui';
    }
  }

  private getStoredAuthData(): AuthData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      // Try new format first
      const authData = localStorage.getItem('auth_data');
      if (authData) {
        const parsed = JSON.parse(authData);
        if (parsed.token && parsed.user) {
          return parsed;
        }
      }

      // Fallback to legacy format
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        return {
          token,
          user: JSON.parse(user),
          expiresAt: Date.now() + (2 * 60 * 60 * 1000) // Assume 2 hours from now
        };
      }
    } catch (error) {
      console.error('Error getting stored auth data:', error);
    }
    
    return null;
  }

  private getValidToken(): string | null {
    const authData = this.getStoredAuthData();
    
    if (!authData) return null;
    
    // Check if token is expired
    if (authData.expiresAt && Date.now() >= authData.expiresAt) {
      console.log('Token expired');
      return null;
    }
    
    return authData.token;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const authData = this.getStoredAuthData();
      if (!authData?.token) {
        console.log('No auth data for refresh');
        return false;
      }

      console.log('Attempting token refresh...');

      // Try refresh endpoint first
      try {
        const response = await axios.post(`${this.api.defaults.baseURL}/refresh`, {}, {
          headers: {
            'Authorization': `Bearer ${authData.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000
        });

        if (response.data.token && response.data.user) {
          this.saveAuthData(response.data.token, response.data.user, response.data.refreshToken);
          console.log('Token refreshed successfully');
          return true;
        }
      } catch (refreshError: any) {
        console.log('Refresh endpoint failed:', refreshError.response?.status);
        
        // If refresh endpoint fails, try user profile endpoint as fallback
        if (refreshError.response?.status !== 401) {
          try {
            const userResponse = await axios.get(`${this.api.defaults.baseURL}/user`, {
              headers: {
                'Authorization': `Bearer ${authData.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              timeout: 10000
            });

            if (userResponse.data.user) {
              // Extend token expiry
              const newExpiresAt = Date.now() + (2 * 60 * 60 * 1000);
              this.saveAuthData(authData.token, userResponse.data.user, authData.refreshToken, newExpiresAt);
              console.log('Token validated and extended');
              return true;
            }
          } catch (userError) {
            console.log('User profile validation failed');
          }
        }
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  private saveAuthData(token: string, user: any, refreshToken?: string, expiresAt?: number): void {
    if (typeof window === 'undefined') return;

    const authData: AuthData = {
      token,
      user,
      refreshToken,
      expiresAt: expiresAt || (Date.now() + (2 * 60 * 60 * 1000))
    };

    try {
      localStorage.setItem('auth_data', JSON.stringify(authData));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update cookie
      const cookieExpiry = 7 * 24 * 60 * 60; // 7 days
      document.cookie = `token=${token}; path=/; max-age=${cookieExpiry}; secure; samesite=strict`;
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  }

  private handleAuthFailure(): void {
    if (typeof window === 'undefined') return;

    try {
      // Clear all auth data
      localStorage.removeItem('auth_data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('backup_token');
      
      // Clear cookie
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error handling auth failure:', error);
    }
  }

  // Public methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  // Get the underlying axios instance if needed
  getAxiosInstance(): AxiosInstance {
    return this.api;
  }

  // Force token refresh
  async forceRefreshToken(): Promise<boolean> {
    return this.refreshToken();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getValidToken();
  }

  // Get current user
  getCurrentUser(): any | null {
    const authData = this.getStoredAuthData();
    return authData?.user || null;
  }
}

// Create and export singleton instance
const apiClient = new ApiClient();

export default apiClient;
export { ApiClient };
