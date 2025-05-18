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

**Backend:**
*   Laravel (Version: Latest stable, e.g., 10.x or 11.x)
*   PHP (Version: 8.1+)
*   Database: MySQL (or any other Laravel-compatible SQL database)
*   Web Server: Apache/Nginx (or `php artisan serve` for development)

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
│   ├── pubspec.yaml        # Flutter dependencies
│   └── .env.example        # Frontend environment variables template
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
│   ├── .env.example        # Backend environment variables template
│   └── composer.json       # PHP dependencies
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

*   Flutter SDK: [Installation Guide](https://flutter.dev/docs/get-started/install)
*   PHP: Version 8.1 or higher.
*   Composer: [Installation Guide](https://getcomposer.org/doc/00-intro.md)
*   Node.js and npm (usually for Laravel Breeze/Jetstream if used, or frontend asset compilation - might not be strictly necessary for this API-only backend if not using such features).
*   A web server environment (e.g., XAMPP, Laragon, MAMP) or Docker for the backend.
*   A database server (e.g., MySQL).

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

## 🔗 Key API Endpoints

The backend provides several API endpoints. Here are a few key ones:

*   **Authentication:**
    *   `POST /api/register`: User registration.
    *   `POST /api/login`: User login.
    *   `POST /api/logout`: User logout (requires authentication).
*   **Stations:**
    *   `GET /api/stations`: Get a list of all train stations.
*   **Trains/Schedules:**
    *   `GET /api/trains`: Get available train schedules (can be filtered by `departure_station_id`, `arrival_station_id`, `date`).
    *   `GET /api/trains/{id}/seats`: Get available seats for a specific train.
*   **Bookings:**
    *   `POST /api/bookings`: Create a new booking (requires authentication).
    *   `GET /api/bookings/history`: Get booking history for the authenticated user.
    *   `PUT /api/bookings/{transactionId}/status`: Update the status of a booking (e.g., to "confirmed" or "paid").

*(Note: Ensure you pass the authentication token (Bearer token) in the headers for protected routes after login.)*

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