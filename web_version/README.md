# 🚄 KeretaXpress Web - Modern Train Booking Platform

<div align="center">

![KeretaXpress Logo](https://img.shields.io/badge/KeretaXpress-Train%20Booking-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38BDF8?style=for-the-badge&logo=tailwindcss)

*A beautiful, modern, and feature-rich train booking platform built with Next.js 15, TypeScript, and Tailwind CSS*

</div>

## 🌟 Enhanced Features

### 🎨 **Modern UI/UX Design**
- **Stunning Visual Design**: Beautiful dark blue gradient background with animated SVG patterns
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Micro-interactions, hover effects, and loading animations
- **Professional Components**: Consistent design language with modern aesthetics
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### 🔍 **Advanced Search & Booking System**
- **Intelligent Search**: Auto-suggestions with keyboard navigation
- **Real-time Validation**: Instant feedback on form inputs
- **Multi-step Booking**: Guided booking flow with progress indicators
- **Seat Selection**: Interactive seat map with real-time availability
- **Dynamic Pricing**: Live price updates based on selection

### 🎫 **Comprehensive Booking Management**
- **Booking History**: Complete transaction history with filtering
- **Status Tracking**: Real-time booking status updates
- **Payment Integration**: Secure payment confirmation process
- **Receipt Generation**: Digital receipts and booking confirmations
- **Booking Modifications**: Edit and manage existing bookings

### 📱 **Progressive Web App (PWA) Ready**
- **Offline Capability**: Works without internet connection
- **App-like Experience**: Native app feel in the browser
- **Push Notifications**: Real-time booking updates and reminders
- **Install Prompt**: Add to home screen functionality

### 🔔 **Real-Time Notifications**
- **Toast Notifications**: Instant feedback for user actions
- **Status Updates**: Live booking and payment confirmations
- **Error Handling**: Graceful error messages and recovery
- **Loading States**: Beautiful skeleton loaders during data fetch

## 🚀 Core Features

### **Authentication & User Management**
- Secure user registration and login with form validation
- JWT token-based authentication with Laravel Sanctum
- Protected routes and session management
- User profile management and preferences

### **Train Schedule & Search**
- Advanced search with date picker and station selection
- Real-time train availability and pricing
- Search history and popular routes
- Filtering by price, duration, and departure time

### **Booking Flow**
- Multi-step booking process with validation
- Passenger information collection
- Seat selection with interactive seat map
- Payment confirmation and receipt generation

### **Payment System**
- Payment proof upload functionality
- Transaction ID generation and tracking
- Booking status management (Pending, Confirmed, Cancelled)
- Payment history and receipts

## 🛠️ Technical Stack

### **Frontend Technologies**
- **Next.js 15**: React framework with App Router and server components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React Hook Form**: Performant form handling with validation
- **Axios**: HTTP client for API communication

### **UI Components & Icons**
- **Heroicons**: Professional SVG icon library
- **React Icons**: Extended icon collection
- **React Datepicker**: Advanced date selection component
- **Custom Components**: Reusable UI components with consistent design

### **Development Tools**
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix addition
- **TypeScript Config**: Strict type checking and path mapping

### **Performance & Optimization**
- **Next.js Optimization**: Automatic code splitting and image optimization
- **Bundle Analysis**: Built-in bundle analyzer for size optimization
- **Caching Strategy**: Efficient API caching and state management
- **SEO Optimization**: Meta tags, structured data, and semantic HTML

## 📁 Project Structure

```
web_version/
├── src/
│   ├── app/                    # Next.js 15 App Router pages
│   │   ├── booking-history/    # Booking history management
│   │   ├── login/             # User authentication
│   │   ├── register/          # User registration
│   │   ├── schedule/          # Train schedule search
│   │   ├── seat-selection/    # Interactive seat selection
│   │   ├── passenger-info/    # Passenger details form
│   │   ├── payment/           # Payment confirmation
│   │   ├── payment-success/   # Payment success page
│   │   └── page.tsx           # Homepage with features
│   │
│   ├── components/            # Reusable React components
│   │   ├── auth/             # Authentication components
│   │   ├── booking/          # Booking-related components
│   │   ├── home/             # Homepage components
│   │   ├── navigation/       # Navigation and layout
│   │   ├── payment/          # Payment components
│   │   ├── schedule/         # Schedule and search components
│   │   ├── skeletons/        # Loading skeleton components
│   │   └── ui/               # Generic UI components
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Main type declarations
│   │
│   ├── utils/                # Utility functions
│   │   ├── api.ts            # API service layer
│   │   └── format.ts         # Data formatting utilities
│   │
│   ├── constants/            # Application constants
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # External library configurations
│   └── styles/               # Global styles and themes
│
├── public/                   # Static assets (icons, images)
├── .env.local               # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── Dockerfile              # Docker containerization
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Backend API running (Laravel - see `/tesbackend`)

### **Installation**

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd KeretaXpress/web_version
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration:**
   Create `.env.local` file:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   
   # Authentication (if using NextAuth)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Optional: Analytics and monitoring
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint code quality checks
```

## 🔗 API Integration

### **Backend Requirements**
This web application connects to a Laravel backend API that provides:

- **Authentication**: User registration, login, logout with Sanctum tokens
- **Stations**: Train station data and management
- **Trains**: Schedule search, availability, and pricing
- **Bookings**: Create, read, update booking status
- **Payments**: Payment proof upload and confirmation

### **Key API Endpoints**
```typescript
// Authentication
POST /api/register    # User registration
POST /api/login       # User login
POST /api/logout      # User logout

// Public Data
GET /api/stations     # Get all stations
GET /api/trains/all   # Get all trains

// Protected Routes (requires Bearer token)
GET /api/trains/search           # Search trains
POST /api/bookings              # Create booking
GET /api/bookings/history       # Get booking history
PUT /api/bookings/{id}/status   # Update booking status
POST /api/payments/{id}/upload  # Upload payment proof
```

### **API Configuration**
Update your backend CORS settings to allow requests from:
```php
// In your Laravel backend config/cors.php
'allowed_origins' => [
    'http://localhost:3000',  // Development
    'https://your-domain.com' // Production
],
```

## 🐳 Docker Deployment

### **Local Docker Setup**
```bash
# Build the Docker image
docker build -t keretaxpress-web .

# Run the container
docker run -p 3000:8080 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  keretaxpress-web
```

### **Production Deployment**
The application is optimized for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Google Cloud Run**
- **AWS Lambda** (with serverless-nextjs)

## 🔒 Security Features

### **Authentication & Authorization**
- JWT token-based authentication
- Protected route middleware
- Secure session management
- XSS and CSRF protection

### **Data Validation**
- Client-side form validation
- Server-side API validation
- Type safety with TypeScript
- Input sanitization

### **Security Headers**
Configured security headers in `next.config.js`:
```javascript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin'
}
```

## 📱 Mobile Responsiveness

### **Responsive Design**
- **Mobile-first approach** with Tailwind CSS breakpoints
- **Touch-friendly interfaces** with appropriate tap targets
- **Optimized navigation** with hamburger menu for mobile
- **Adaptive layouts** that work on all screen sizes

### **Performance Optimization**
- **Image optimization** with Next.js Image component
- **Code splitting** for faster page loads
- **Lazy loading** for improved performance
- **Service worker** for offline functionality

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--blue-600: #2563eb    /* Primary brand color */
--blue-700: #1d4ed8    /* Secondary brand color */
--indigo-800: #3730a3  /* Accent color */

/* Gradient Backgrounds */
background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3730a3 100%);
```

### **Typography**
- **Font Family**: System fonts for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Responsive Sizing**: Fluid typography that scales with screen size

### **Components**
All components follow consistent patterns:
- Hover states and focus indicators
- Loading states with skeleton animations
- Error states with recovery actions
- Success states with confirmation feedback

## 🔄 State Management

### **Client-side State**
- **React Hooks**: useState, useEffect, useCallback for local state
- **Form State**: React Hook Form for complex form management
- **Local Storage**: Persistent storage for user preferences
- **Session Storage**: Temporary data for booking flow

### **Server State**
- **API Caching**: Efficient data fetching and caching
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton loaders and progress indicators

## 🚀 Performance Metrics

### **Core Web Vitals**
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### **Optimization Features**
- Bundle size optimization with Next.js
- Image optimization and lazy loading
- Code splitting and dynamic imports
- Service worker for caching

## 📊 Analytics Ready

### **Tracking Implementation**
Ready for integration with:
- **Google Analytics 4**: User behavior and conversion tracking
- **Hotjar**: User experience and heat map analysis
- **Sentry**: Error monitoring and performance tracking
- **Custom Events**: Booking funnel and conversion optimization

## 🛠️ Development Guidelines

### **Code Quality**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality assurance

### **Testing Strategy**
```bash
# Unit tests (ready for implementation)
npm run test

# End-to-end tests (Cypress/Playwright ready)
npm run test:e2e

# Component testing
npm run test:components
```

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new booking feature"
git push origin feature/new-feature
```

## 🎉 Production Ready Features

### **✅ Completed Features**
- Modern, responsive UI/UX design
- Complete booking flow from search to payment
- User authentication and session management
- Real-time notifications and feedback
- Mobile-responsive design
- Error handling and recovery
- Performance optimizations
- Security implementations
- Docker containerization
- TypeScript type safety

### **🚀 Ready for Enhancement**
- PWA implementation (service worker ready)
- Multi-language support (i18n structure)
- Dark/light theme toggle
- Advanced filtering and sorting
- Booking modifications and cancellations
- Loyalty program integration
- Social authentication (Google, Facebook)
- Payment gateway integration (Stripe, PayPal)

## 📞 Support & Documentation

### **Additional Documentation**
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide and instructions
- [API Documentation](../tesbackend/README.md) - Backend API reference

### **Getting Help**
- Check the [Issues](../../issues) for common problems
- Review the [API documentation](../tesbackend/README.md) for backend setup
- Ensure your backend is running and accessible


<div align="center">
<strong>🚄 KeretaXpress - Making train travel booking simple and beautiful</strong>
</div>
