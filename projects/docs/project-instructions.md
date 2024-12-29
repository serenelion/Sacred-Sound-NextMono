
# Sacred Sound Platform - Project Instructions

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- NPM or Yarn package manager
- Git for version control

### Initial Setup
1. Clone the repository in Replit
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in Replit Secrets

### Development
1. Start the development server:
```bash
npm run dev
```
2. Access the application at `0.0.0.0:3000`

## Project Structure
- `/src` - Application source code
- `/public` - Static assets
- `/projects/docs` - Project documentation
- `/attached_assets` - Design assets and mockups

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Follow component-based architecture

### Component Development
1. Create new components in `/src/components`
2. Use UI components from `/src/components/ui`
3. Follow existing naming conventions
4. Include TypeScript types/interfaces

### API Integration
1. Create API routes in `/src/app/api`
2. Use authentication context where needed
3. Follow error handling patterns
4. Implement proper validation

### Testing
1. Write unit tests for components
2. Test API integrations
3. Perform end-to-end testing
4. Validate responsive design

## Deployment
1. Use Replit's deployment features
2. Configure environment variables
3. Run build process
4. Deploy to production

## Documentation
- Update relevant documentation when adding features
- Document API changes
- Keep design assets updated
- Document configuration changes
