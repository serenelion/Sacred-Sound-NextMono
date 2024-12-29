
# Media Player Component Documentation

## Overview
The media player is a global component that persists throughout the application, allowing continuous playback across different routes. It appears in the following endpoints:
- `/library`
- `/track/:trackId`
- `/profile/:artistId`
- `/album/:albumId`

## States
1. **Now Playing**
   - Full player with artwork, track info, and controls
   - Progress bar with elapsed/remaining time
   - Volume control
   - Track queue management

2. **Minified**
   - Compact version showing minimal track info
   - Basic playback controls
   - Quick access to expand

3. **Full Screen**
   - Expanded view with large artwork
   - Enhanced visualization
   - Complete playback controls
   - Queue management
   - Lyrics display (if available)

## Features
- Continuous playback across route changes
- Adaptive audio quality based on network conditions
- Background playback
- Queue management (add, remove, reorder)
- Playback controls (play/pause, next, previous, seek)
- Volume control with mute toggle
- Track progress visualization
- Keyboard shortcuts support

## Technical Implementation

### State Management
- Track currently playing
- Queue state
- Player state (playing/paused)
- Volume level
- Current time/duration
- Display mode (full/minified/fullscreen)

### Network Handling
- HLS.js integration for adaptive streaming
- Network status monitoring
- Quality adjustment based on connection
- Buffering states

### Events
- Audio events (play, pause, ended, timeupdate)
- Network events (online/offline)
- User interaction events
- Route change handling

### Accessibility
- ARIA labels for controls
- Keyboard navigation
- Screen reader support
- Focus management

## Component Structure
```typescript
interface Track {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  audioUrl: string;
  duration: number;
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  displayMode: 'full' | 'minified' | 'fullscreen';
}
```

## Usage Example
```typescript
// Global player context
const PlayerContext = createContext<PlayerContextType>(null);

// Hook usage
const { 
  currentTrack, 
  play, 
  pause, 
  next, 
  previous,
  setVolume,
  toggleDisplayMode 
} = usePlayer();
```