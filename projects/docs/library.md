
# Sacred Sound Library Documentation

## Overview
The Library component serves as the central content hub for discovering and playing sacred music content. It features a fixed left navigation, personalized recommendations through swipeable interfaces, and a persistent media player.

## Core Components

### Left Navigation
- Fixed sidebar with Sacred Sound logo
- Global search field at the top
- Primary navigation sections:
  - Library (currently selected)
  - Concert Hall
  - Feed
  - My Account
- Upload button (visible only to artists)

### Content Recommendations
- Multiple SwipeComponent sections displaying personalized content
- Navigation arrows for horizontal scrolling
- Each item displays:
  - Cover artwork
  - Track name
  - Artist name
- Categories include:
  - New Releases
  - Featured Content
  - Sacred Chants
  - Meditation Content
  - Sound Healing

### Media Player Integration
- Persistent audio player across views
- States: Now Playing, Minimized
- Controls: Play/Pause, Next/Previous, Volume
- Displays current track and artist information

## Content Types
- Music Tracks
  - Studio recordings
  - Live performances
  - Sacred chants
- Meditation Content
  - Guided meditations
  - Sound healing
  - Ambient soundscapes
- Collections
  - Albums
  - Playlists
  - Artist collections

## API Integration

### Recombee Endpoints
```typescript
GET /api/recommendations/${userId}
  - Returns personalized content recommendations
  - Parameters: userId, contentType
  - Response: Array of content items with metadata
```

### Navigation Endpoints
- `/artist/:artistId` - Artist profile pages
- `/album/:albumId` - Album detail pages
- `/track/:trackId` - Individual track pages

## State Management
- Global player state
- Current playing track
- Content recommendations
- User preferences
- Search/filter state

## Responsive Design

### Desktop (> 1024px)
- Fixed left sidebar with full navigation
- Grid layout with 4 items per row
- Horizontal scrolling sections with navigation arrows
- Full-width player controls

### Tablet & Mobile
- Collapsible sidebar with hamburger menu
- Adaptive grid layout
- Touch-friendly controls
- Optimized media player placement

## Keyboard Navigation
- Space: Play/Pause
- Arrow keys: Navigate content
- Enter: Select item
- Shift + Enter: Add to queue
