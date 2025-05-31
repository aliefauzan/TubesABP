# KeretaXpress - Train Booking Application

## 📚 Description

KeretaXpress is a mobile application for booking train tickets. It allows users to search for train schedules, book tickets, manage their bookings, and simulate payment confirmation. The project consists of a Flutter-based frontend and a Laravel-based backend.

## ✨ Features

*   **User Authentication**: Secure user registration and login.
*   **Train Schedule Search**: Search for available trains based on departure/arrival stations and date.
*   **Seat Selection**: (Basic implementation) Users can specify a seat number during booking.
*   **Booking System**: Create and manage train ticket bookings.
*   **Payment Simulation**: Users can "upload payment proof" to change booking status to "confirmed".
*   **Booking History**: View past and current bookings with their statuses.
*   **Status Filtering**: Filter booking history by status (All, Pending, Confirmed).
*   **Responsive UI**: Adapts to different screen sizes for some elements.
*   **Error Handling**: Graceful error handling for API requests and user input.
*   **Backend API**: RESTful API built with Laravel to manage data.

## 🛠️ Tech Stack

**Frontend:**
*   Flutter (Version: Latest stable, e.g., 3.x.x)
*   Dart (Version: Latest stable, e.g., 3.x.x)
*   Key Packages:
    *   `http`: For making API calls.
    *   `intl`: For date and number formatting (localization).
    *   `flutter_dotenv`: For managing environment variables.

**Web Frontend:**
*   Next.js (Version: Latest stable)
*   TypeScript
*   React
*   Tailwind CSS
*   Key Packages:
    *   `axios`: For making API calls.
    *   `react-icons`: For UI icons.

**Backend:**
*   Laravel (Version: Latest stable, e.g., 10.x or 11.x)
*   PHP (Version: 8.1+)
*   Laravel Sanctum (For API authentication)
*   Database: Supabase PostgreSQL (Cloud-hosted)
*   Deployment: Google Cloud Platform
    *   Google Cloud Build (CI/CD)
    *   Google Cloud Run (Serverless deployment)
    *   Docker containerization
*   Web Server: Nginx (via Cloud Run)

## 📂 Project Structure

```
.
├── frontend/               # Flutter application (Mobile Frontend)
│   ├── lib/
│   │   ├── core/           # Core logic (services, exceptions)
│   │   ├── models/         # Data models
│   │   ├── screens/        # UI Screens
│   │   ├── utils/          # Utility functions (theme, formatters)
│   │   └── widgets/        # Reusable UI widgets
│   ├── assets/             # Images and other assets
│   │   ├── images/
│   │   └── logo/
│   ├── android/            # Android-specific configuration
│   ├── ios/                # iOS-specific configuration
│   ├── web/                # Flutter web configuration
│   ├── test/               # Unit and widget tests
│   ├── pubspec.yaml        # Flutter dependencies
│   └── .env.example        # Frontend environment variables template
│
├── web_version/            # Next.js web application (Web Frontend)
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # Reusable React components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions and API calls
│   ├── public/             # Static assets
│   ├── .env.local          # Environment variables
│   ├── package.json        # Node.js dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.json       # TypeScript configuration
│   └── next.config.js      # Next.js configuration
│
├── tesbackend/             # Laravel application (Backend API)
│   ├── app/
│   │   ├── Http/Controllers/ # API controllers
│   │   ├── Models/         # Eloquent models
│   │   └── Services/       # Business logic services
│   ├── config/             # Configuration files
│   ├── database/
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seeders
│   ├── routes/             # API routes (api.php)
│   ├── storage/            # File storage
│   ├── cloudbuild.yaml     # Google Cloud Build configuration
│   ├── Dockerfile          # Docker configuration for Cloud Run
│   ├── .env.example        # Backend environment variables template
│   └── composer.json       # PHP dependencies
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

*   Flutter SDK: [Installation Guide](https://flutter.dev/docs/get-started/install)
*   Node.js and npm: [Installation Guide](https://nodejs.org/) (For web frontend)
*   PHP: Version 8.1 or higher.
*   Composer: [Installation Guide](https://getcomposer.org/doc/00-intro.md)
*   Supabase account: [Sign up](https://supabase.com/) (For PostgreSQL database)
*   Google Cloud Platform account: [Sign up](https://cloud.google.com/) (For deployment)
*   Docker: [Installation Guide](https://docs.docker.com/get-docker/) (For containerization)
*   Google Cloud CLI: [Installation Guide](https://cloud.google.com/sdk/docs/install)

### Backend Setup (Laravel - `tesbackend/`)

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-url>
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd tesbackend
    ```

3.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

4.  **Create your environment file:**
    Copy `.env.example` to `.env` and configure your database connection (DB\_HOST, DB\_PORT, DB\_DATABASE, DB\_USERNAME, DB\_PASSWORD) and other settings like `APP_URL`.
    ```bash
    cp .env.example .env
    ```

5.  **Generate an application key:**
    ```bash
    php artisan key:generate
    ```

6.  **Run database migrations:**
    (Ensure your database is created and accessible as per your `.env` configuration)
    ```bash
    php artisan migrate --seed  # Add --seed if you have seeders
    ```

7.  **Serve the application (for development):**
    ```bash
    php artisan serve
    ```
    This will typically start the backend server on `http://127.0.0.1:8000`. Note this URL for the frontend configuration.

### Frontend Setup (Flutter - `frontend/`)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend  # If you are in tesbackend/
    # or cd frontend from the project root
    ```

2.  **Install Flutter dependencies:**
    ```bash
    flutter pub get
    ```

3.  **Create your environment file:**
    Navigate to the `frontend/` directory. Copy the `.env.example` file (if one exists, otherwise create it) to `.env`.
    Add your backend API base URL:
    ```env
    # frontend/.env
    API_BASE_URL=http://127.0.0.1:8000/api
    ```
    *(Adjust the URL if your backend is served on a different address or port, or if you are using a mobile emulator/device that requires a different IP address, e.g., `http://10.0.2.2:8000/api` for Android Emulator accessing host machine's localhost).*

4.  **Run the Flutter application:**
    Connect a device or start an emulator/simulator.
    ```bash
    flutter run
    ```

### Web Frontend Setup (Next.js - `web_version/`)

1.  **Navigate to the web frontend directory:**
    ```bash
    cd ../web_version  # If you are in tesbackend/
    # or cd web_version from the project root
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Copy the `.env.local.example` file (if one exists) to `.env.local`, or create `.env.local` with:
    ```env
    # web_version/.env.local
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
    ```

4.  **Run the Next.js application:**
    ```bash
    npm run dev
    ```
    This will start the web frontend on `http://localhost:3000`.

## 🔗 Key API Endpoints

The backend provides several API endpoints. Here are all the available routes:

### Public Routes (No Authentication Required)

*   **Authentication:**
    *   `POST /api/register`: User registration.
    *   `POST /api/login`: User login.

*   **Stations:**
    *   `GET /api/stations`: Get a list of all train stations.

*   **Trains/Schedules:**
    *   `GET /api/trains/all`: Get all available trains.

### Protected Routes (Authentication Required)

*   **Authentication:**
    *   `POST /api/logout`: User logout.
    *   `GET /api/user/{id?}`: Get authenticated user details.

*   **Trains/Schedules:**
    *   `GET /api/trains/search`: Search for trains based on departure/arrival stations and date.
    *   `GET /api/trains/promo`: Get promotional train offers.
    *   `GET /api/trains/{id}/available-seats`: Get available seats for a specific train.

*   **Bookings:**
    *   `POST /api/bookings`: Create a new booking.
    *   `GET /api/bookings/history`: Get booking history for the authenticated user.
    *   `PUT /api/bookings/{transactionId}/status`: Update the status of a booking.

*   **Payments:**
    *   `POST /api/payments/{id}/upload`: Upload payment proof for a booking.

### API Authentication

For protected routes, include the authentication token in the request headers:
```
Authorization: Bearer {your-token-here}
```

The token is obtained from the login endpoint and should be stored securely in your frontend application.

## ☁️ Cloud Infrastructure & Deployment

### Backend Deployment (Google Cloud Platform)

The Laravel backend is deployed using Google Cloud Platform with the following architecture:

#### **Database: Supabase PostgreSQL**
- **Service**: Supabase (cloud-hosted PostgreSQL)
- **Benefits**: 
  - Automatic backups and scaling
  - Built-in authentication (though we use Laravel Sanctum)
  - Real-time capabilities
  - Dashboard for database management

#### **Backend API: Google Cloud Run**
- **Service**: Google Cloud Run (serverless containers)
- **Benefits**:
  - Automatic scaling from 0 to N instances
  - Pay-per-use pricing model
  - No server management required
  - Built-in load balancing

#### **CI/CD: Google Cloud Build**
- **Service**: Google Cloud Build
- **Configuration**: `tesbackend/cloudbuild.yaml`
- **Process**:
  1. Code push triggers build
  2. Docker image creation
  3. Database migrations (if needed)
  4. Deploy to Cloud Run
  5. Automatic rollback on failure

### Deployment URLs

#### **Production Backend API**
```
https://your-service-name-hash-uc.a.run.app/api
```

#### **Development Backend API**
```
http://localhost:8000/api
```

### Environment Configuration

#### **Backend (.env)**
```env
# Production Environment
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-service-name-hash-uc.a.run.app

# Supabase PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=db.your-project-ref.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-supabase-password

# CORS for frontends
SANCTUM_STATEFUL_DOMAINS=your-web-domain.com,your-mobile-app.com
```

#### **Web Frontend (.env.local)**
```env
# Production API endpoint
NEXT_PUBLIC_API_BASE_URL=https://your-service-name-hash-uc.a.run.app/api

# Development API endpoint
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

#### **Mobile Frontend (.env)**
```env
# Production API endpoint
API_BASE_URL=https://your-service-name-hash-uc.a.run.app/api

# Development API endpoint (for emulator)
# API_BASE_URL=http://10.0.2.2:8000/api
```

### Deployment Commands

#### **Deploy Backend to Google Cloud**
```powershell
# Navigate to backend directory
cd tesbackend

# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or manual Docker deployment
docker build -t gcr.io/your-project-id/train-booking-api .
docker push gcr.io/your-project-id/train-booking-api
gcloud run deploy train-booking-api --image gcr.io/your-project-id/train-booking-api --region us-central1
```

#### **Deploy Web Frontend (Vercel/Netlify)**
```powershell
# Navigate to web frontend directory
cd web_version

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Or deploy to Netlify
npm run build && npx netlify deploy --prod --dir=.next
```

### Monitoring & Maintenance

#### **Google Cloud Monitoring**
- **Logs**: View application logs in Cloud Logging
- **Metrics**: Monitor performance and usage
- **Alerts**: Set up alerts for errors and performance issues

#### **Supabase Dashboard**
- **Database**: Monitor database performance and connections
- **Logs**: View database query logs
- **Backups**: Automatic daily backups

#### **Health Checks**
```powershell
# Check backend API health
curl https://your-service-name-hash-uc.a.run.app/api/stations

# Check database connectivity
curl https://your-service-name-hash-uc.a.run.app/api/trains/all
```

## 🖼️ Screenshots

*(Placeholder: You can add screenshots of the application here.)*
*   Login Screen
*   Home Screen
*   Schedule Search
*   Booking History
*   Payment Confirmation

## 📜 License

This project can be considered under the [MIT License](LICENSE.md) (You would need to create a LICENSE.md file with the MIT license text if you choose this).

---

This README provides a good starting point. You can further customize it by adding more details, specific version numbers, or links to live demos if applicable. 