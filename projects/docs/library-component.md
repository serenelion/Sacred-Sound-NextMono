
# Library Component Documentation

## Overview
The Library component serves as the main content hub, displaying personalized recommendations through a swipeable interface. It integrates with Recombee API for content recommendations and includes a media player and navigation.

## Components

### Left Navigation
- Fixed sidebar for application navigation
- Sections for Browse, Library, Profile
- Upload button (visible only to artists)

### Media Player
- Persistent audio player across views
- States: Now Playing, Minimized
- Controls: Play/Pause, Next/Previous, Volume
- Currently playing track information

### Content Recommendations
- SwipeComponent integration for each content category
- Categories:
  - Music Videos
  - Meditation Content
  - Studio Recordings
- Recombee API integration for personalized content

## API Integration

### Recombee Endpoints
```typescript
GET /api/recommendations/${userId}
  - Returns personalized content recommendations
  - Parameters: userId, contentType
  - Response: Array of content items with metadata
```

### Content Metadata
```typescript
GET /api/content/${contentId}
  - Returns detailed content information
  - Parameters: contentId
  - Response: Content metadata including title, artist, duration
```

## Authentication & Authorization
- Uses AuthContext for user session management
- Artist role check for upload functionality
- Protected routes for authenticated users

## State Management
- User authentication state
- Current playing track
- Content recommendations
- Upload modal state (for artists)

## Component Flow
1. Component mounts and checks authentication
2. Fetches user-specific recommendations
3. Loads content metadata for recommendations
4. Updates player state based on user interaction
5. Conditionally renders upload button for artists

## Responsive Design
- Breakpoints:
  - Desktop: > 1024px
  - Tablet: 768px - 1024px
  - Mobile: < 768px
- Adjustable sidebar visibility
- Responsive player controls
- Adaptive swipe components

## Dependencies
- React
- Recombee API Client
- SwipeComponent
- AudioPlayer
- AuthContext
