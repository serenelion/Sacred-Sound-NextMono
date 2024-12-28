
# Sacred Sound Platform - Library Documentation

## Overview
The library serves as the central hub for users to discover, organize and play sacred music content. It provides personalized recommendations and seamless integration with the global media player.

## Core Features
- Personalized content recommendations
- Global media player integration
- Content filtering and organization
- Artist and album browsing
- Playlist management

## Component Architecture

### Main Components
```typescript
interface LibraryProps {
  userId: string;
  contentType?: 'music' | 'meditation' | 'all';
}

interface ContentItem {
  id: string;
  title: string;
  artist: string;
  type: 'track' | 'album' | 'meditation';
  duration: number;
  coverUrl: string;
  audioUrl: string;
}

interface PlaylistData {
  id: string;
  name: string;
  tracks: ContentItem[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Content Categories
1. Music Tracks
   - Studio recordings
   - Live performances
   - Sacred chants

2. Meditation Content
   - Guided meditations
   - Sound healing
   - Ambient soundscapes

3. Collections
   - User-created playlists
   - Featured compilations
   - Artist collections

## API Integration

### Endpoints
- `GET /api/getContentByArtist` - Fetch artist content
- `GET /api/getUserLoves` - Get user favorites
- `PATCH /api/updateUserLoves` - Update favorites
- `PATCH /api/updateUserFavorites` - Manage user favorites
- `POST /api/logContentUsage` - Track content interactions

### Content Recommendations
- Recombee API integration for personalized suggestions
- User behavior tracking for improved recommendations
- Content similarity matching

## State Management
- Global player state
- Content filtering state
- Playlist management
- User preferences
- Search/filter state

## User Interface

### Layout Components
- Content grid/list views
- Filter sidebar
- Search bar
- Sort controls
- Playlist manager

### Responsive Design
- Grid layout adapts to screen size
- Collapsible sidebar on mobile
- Touch-friendly controls
- Optimized media player placement

## Keyboard Navigation
- Space: Play/Pause
- Arrow keys: Navigate content
- Enter: Select item
- Shift + Enter: Add to queue
