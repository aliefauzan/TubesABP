# 🚄 KeretaXpress - Modern Train Booking Platform

<div align="center">

![KeretaXpress Logo](https://img.shields.io/badge/KeretaXpress-Train%20Booking-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)

*A beautiful, modern, and feature-rich train booking platform built with Next.js and TypeScript*

</div>

## 🌟 Enhanced Features

### 🎨 **Modern UI/UX Design**
- Beautiful dark blue gradient background with animated SVG patterns
- Responsive design that works on all devices
- Smooth animations and micro-interactions
- Professional component library with consistent design language

### 🔍 **Advanced Search System**
- Intelligent search suggestions with keyboard navigation
- Search history with localStorage persistence
- Popular routes and recent destinations
- Real-time form validation and feedback

### 📱 **Progressive Web App (PWA)**
- Native app installation prompts
- Offline-ready architecture
- Push notifications support
- App-like user experience

### 🔔 **Real-Time Notifications**
- Centralized notification center
- Toast notifications with multiple types
- Booking reminders and price alerts
- Badge system with unread counters

### 🎫 **Comprehensive Booking Flow**
- Multi-step booking confirmation process
- Quick booking widget for popular routes
- Dynamic pricing display
- Payment integration ready

### 📊 **Interactive Dashboard**
- Animated statistics with trend indicators
- Customer testimonials carousel
- Promotional offers with countdown timers
- User feedback system with star ratings

## 🚀 Core Features

- User authentication (login/register)
- Train schedule search with advanced filtering
- Seat selection with real-time availability
- Booking management and history
- Payment confirmation process
- Real-time notifications and updates

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## Backend API

This application connects to a Laravel backend API that provides the following endpoints:

- Authentication (register, login, logout)
- Train schedules and searches
- Booking management
- Payment processing

Make sure the backend API is running and accessible at the URL specified in your environment variables.
