
# Sacred Sound Platform - Project Structure

## Root Directory
- `package.json` - Project configuration and dependencies
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.replit` - Replit configuration

## Source Code (`/src`)
### App (`/src/app`)
- `layout.tsx` - Root layout component
- `page.tsx` - Home page component
- `/api` - API route handlers
  - `signup` - User registration
  - `waitlist` - Waitlist management
  - `getCheckAccountName` - Username validation
  - `postNewUserWithAccountName` - User creation

### Components (`/src/components`)
- `/ui` - Reusable UI components
  - `accordion.tsx`
  - `alert.tsx`
  - `button.tsx`
  - `card.tsx`
  - `input.tsx`
  - `label.tsx`
- `artist-landing-page.tsx` - Artist landing page component
- `artist-signup-form.tsx` - Artist registration form
- `landing-page.tsx` - Main landing page component

### Contexts (`/src/contexts`)
- `auth-context.tsx` - Authentication context provider

### Libraries (`/src/lib`)
- `auth.ts` - Authentication utilities
- `utils.ts` - Common utility functions

## Documentation (`/projects/docs`)
- `beta-prd.md` - Product requirements document
- `library-component.md` - Library component documentation

## Public Assets (`/public`)
- SVG icons and images
  - `file.svg`
  - `globe.svg`
  - `next.svg`
  - `vercel.svg`
  - `window.svg`

## Configuration Files
- `.gitignore` - Git ignore rules
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

## Design Assets (`/attached_assets`)
- UI mockups and documentation for various pages
  - Landing page
  - Artist page
  - Library
  - Login/Signup flows
  - Upload interface
