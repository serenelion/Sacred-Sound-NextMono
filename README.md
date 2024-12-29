
# Sacred Sound Platform

A Next.js-based web application for artists to share and manage their music content.

## Project Overview

Sacred Sound Platform is a music platform that enables artists to upload, manage, and share their music content with listeners.

## Tech Stack

- **Frontend**: Next.js 15.1.3
- **UI Framework**: React 19.0.0
- **Styling**: Tailwind CSS
- **TypeScript**: For type safety
- **Authentication**: JWT-based

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API route handlers
│   │   ├── artistSignup/   # Artist signup page
│   │   └── create/         # Artist landing page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── ...            # Feature components
│   ├── contexts/          # React contexts
│   └── lib/               # Utility functions
```

## Features

- Artist registration and authentication
- Content upload system
- Music library management
- Waitlist system for early access
- Artist profile pages

## API Endpoints

- `/api/signup` - User registration
- `/api/waitlist` - Waitlist management
- `/api/getCheckAccountName` - Username validation
- `/api/postNewUserWithAccountName` - User creation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://0.0.0.0:3000](http://0.0.0.0:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Components

### UI Components
- `Button` - Reusable button component
- `Input` - Form input component
- `Card` - Content container
- `Alert` - Notification component
- `Accordion` - Collapsible sections

### Feature Components
- `ArtistLandingPage` - Main artist page
- `ArtistSignupForm` - Registration form
- `LandingPage` - Main landing page

## Authentication

The platform uses JWT-based authentication with tokens stored in the auth context. Protected routes require valid authentication tokens.

## Configuration

The project uses various configuration files:
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS settings
- `tsconfig.json` - TypeScript configuration
- `.replit` - Replit-specific settings

## License

See the LICENSE file for details.
