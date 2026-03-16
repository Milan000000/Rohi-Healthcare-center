# Rohi-Healthcare Center - Online Inquiry & Refill System

A professional, secure, and mobile-responsive web application for Rohi-Healthcare Center.

## Features
- **Public Website**: Home, About, Services, Contact.
- **Drug Inquiry**: Check availability of medications online.
- **Prescription Refill**: Request refills by uploading prescriptions.
- **Admin Panel**: Secure dashboard to manage inquiries and refills.
- **SEO Ready**: Optimized for local search visibility.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js (Express) with Vite middleware.
- **Database**: Firebase Firestore.
- **Authentication**: Simple session-based (Admin Panel).

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   - `GEMINI_API_KEY` (if using AI features)
   - Firebase configuration in `firebase-applet-config.json`

## Running Locally
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Deployment
- **Frontend**: Can be built using `npm run build` and hosted on Vercel, Netlify, or GitHub Pages.
- **Backend**: The Express server can be hosted on Render, Railway, or any VPS.

## Admin Access
- **Route**: `/admin`
- **Password**: `milan000000`
