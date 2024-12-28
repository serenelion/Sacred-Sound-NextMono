
# Global Media Player Documentation

## Overview
The Media Player is a persistent component that enables continuous audio playback throughout the application. It maintains playback state across page navigation and supports multiple view modes.

## States
- **Now Playing**: Full player with complete controls and track information
- **Minimized**: Compact player with essential controls
- **Fullscreen**: Immersive view with enhanced visuals

## Features
- Continuous playback across route changes
- Queue management
- Progress tracking
- Volume control
- Repeat/Shuffle modes
- Background audio support

## Component Structure

### PlayerProvider
```typescript
interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track;
  queue: Track[];
  volume: number;
  progress: number;
  duration: number;
  repeatMode: 'none' | 'single' | 'all';
  shuffle: boolean;
}

interface PlayerControls {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (level: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
}
```

### Player Views
1. **NowPlayingBar**
   - Fixed position at bottom
   - Basic controls and track info
   - Queue toggle
   - Minimize/Maximize toggle

2. **MiniPlayer**
   - Floating compact view
   - Play/Pause and track name
   - Drag handle for repositioning

3. **FullscreenPlayer**
   - Cover art display
   - Lyrics integration
   - Enhanced visualizations
   - Detailed track information

## State Management
- Uses React Context for global state
- Persists queue in localStorage
- Maintains audio session across navigation

## API Integration

### Audio Control
```typescript
GET /api/track/${trackId}/stream
  - Returns audio stream
  - Supports range requests
  - Handles different audio formats

GET /api/track/${trackId}/metadata
  - Returns track information
  - Includes duration, artist, album
```

## Events
- `onTrackChange`: Fired when current track changes
- `onStateChange`: Fired when playback state updates
- `onQueueUpdate`: Fired when queue is modified
- `onProgressUpdate`: Fired during playback progress

## Usage Example
```typescript
import { usePlayer } from '@/contexts/player-context';

function TrackList({ tracks }) {
  const { play, addToQueue } = usePlayer();

  return tracks.map(track => (
    <Track
      key={track.id}
      onClick={() => play(track)}
      onQueueAdd={() => addToQueue(track)}
    />
  ));
}
```

## Responsive Design

### Desktop (>1024px)
- Full player bar at bottom
- Extended controls visible
- Queue sidebar support

### Tablet (768px-1024px)
- Collapsible player bar
- Essential controls
- Swipe gestures for queue

### Mobile (<768px)
- Mini player by default
- Expandable to full screen
- Gesture-based controls

## Browser Support
- HTML5 Audio API
- Web Audio API for visualizations
- MediaSession API for system integration
