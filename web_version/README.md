# KeretaXpress Web

A modern train booking web application built with Next.js, connecting to a Laravel backend API.

## Features

- User authentication (login/register)
- Train schedule search
- Seat selection
- Booking management
- Payment confirmation process

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
