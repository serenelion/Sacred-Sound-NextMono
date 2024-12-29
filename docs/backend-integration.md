
# Sacred Sound Platform - Backend Integration Guide

## Overview
This document outlines the integration between the Next.js frontend application and the backend API services.

## Base Configuration

### Environment Variables
Required environment variables for API integration:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.sacredsound.com
NEXT_PUBLIC_RECOMBEE_API_KEY=your_recombee_api_key
```

## API Endpoints Integration

### Authentication
Base URL: `${NEXT_PUBLIC_API_BASE_URL}/api`

#### User Registration
```typescript
POST /signup
Content-Type: application/json

Request:
{
  accountName: string
  email: string
  password: string
  isArtist: boolean
}

Response:
{
  accessToken: string
  success: boolean
}
```

#### Account Validation
```typescript
GET /getCheckAccountName?accountName=string

Response:
{
  available: boolean
  message?: string
}
```

### Content Management

#### Artist Content Upload
```typescript
POST /postNewAlbum
Content-Type: multipart/form-data

Request:
{
  title: string
  description: string
  coverImage: File
  tracks: File[]
  metadata: {
    genre: string
    tags: string[]
    isPublic: boolean
  }
}
```

#### Content Retrieval
```typescript
GET /getContentByArtist?artistId=string
Authorization: Bearer ${token}

Response:
{
  albums: Album[]
  tracks: Track[]
}
```

## Error Handling

### Standard Error Response Format
```typescript
{
  success: false
  error: string
  statusCode: number
}
```

### Common Error Codes
- 400: Bad Request - Invalid input
- 401: Unauthorized - Missing or invalid token
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource doesn't exist
- 500: Internal Server Error

## Authentication Flow

1. User registration/login
2. Receive JWT token
3. Store token in AuthContext
4. Include token in subsequent requests
5. Handle token refresh automatically

## Implementation Example

```typescript
// API request with authentication
const fetchUserContent = async () => {
  try {
    const response = await axios.get('/api/getContentByArtist', {
      headers: {
        Authorization: `Bearer ${authContext.token}`
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
```

## Security Considerations

1. Always use HTTPS for API communications
2. Implement rate limiting on sensitive endpoints
3. Validate all user inputs
4. Use secure password hashing (bcrypt)
5. Implement CORS policies
6. Set secure cookie attributes

## Testing

1. Unit tests for API integrations
2. Integration tests for auth flows
3. End-to-end tests for critical paths
4. Error handling scenarios
5. Token refresh mechanism

## Deployment Considerations

1. Configure environment variables
2. Set up SSL certificates
3. Configure CORS settings
4. Set up monitoring and logging
5. Implement health checks

## Performance Optimization

1. Implement request caching
2. Use CDN for static assets
3. Optimize API response payload
4. Implement pagination
5. Use WebSocket for real-time features
