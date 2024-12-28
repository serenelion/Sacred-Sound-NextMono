
# Sacred Sound Platform - Beta/Production Documentation

## Environment Details
- Development: http://0.0.0.0:3000
- Beta: [Replit Deploy URL]
- Production: [Replit Deploy URL]

## Core Components Status

### Phase 1 (Current Priority)
#### Pages
- [x] Landing Page with Waitlist
- [x] Artist Landing Page (/create)
- [x] Artist Signup Page
- [ ] Library Page
- [ ] Upload Page with Album-First Flow
- [ ] Artist Profile Page
- [ ] Track Page

#### Features
- [x] Email Waitlist
- [x] Basic Form Validation
- [x] Artist Account Creation
- [ ] Album Creation System
- [ ] Content Upload System
- [ ] Global Media Player
- [ ] Authentication Flow

### Phase 2 (Next Sprint)
- [ ] Content Management
- [ ] Playlist Features
- [ ] User Recommendations
- [ ] Search Functionality

## Frontend Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── logout/
│   │   ├── albums/
│   │   │   ├── create/
│   │   │   ├── [albumId]/
│   │   │   └── upload/
│   │   ├── tracks/
│   │   │   ├── [trackId]/
│   │   │   └── metadata/
│   │   └── artists/
│   │       └── [artistId]/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── library/
│   ├── upload/
│   ├── artist/[artistId]/
│   ├── album/[albumId]/
│   └── track/[trackId]/
├── components/
│   ├── upload/
│   │   ├── album-creator.tsx
│   │   ├── track-uploader.tsx
│   │   └── metadata-form.tsx
│   ├── player/
│   │   ├── now-playing.tsx
│   │   ├── mini-player.tsx
│   │   └── full-screen.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   └── shared/
│       ├── buttons.tsx
│       └── inputs.tsx
└── lib/
    ├── api-client.ts
    └── player-state.ts
```

## Component Dependencies

### Global Media Player States
1. Now Playing
   - Full track controls
   - Queue management
   - Track info display
   
2. Mini Player
   - Basic controls
   - Minimized track info
   - Expand button
   
3. Full Screen
   - Immersive view
   - Advanced controls
   - Artwork display
   - Lyrics (future)

### Upload Flow
1. Album Creation (First Step)
   - Album title
   - Cover image
   - Description
   - Visibility settings

2. Track Upload
   - File upload UI
   - Progress tracking
   - Track reordering
   
3. Track Metadata
   - Basic info
   - Genre/tags
   - Credits

## API Integration Status
Current endpoints:
- `/api/auth/*` - Authentication
- `/api/albums/*` - Album management
- `/api/tracks/*` - Track operations
- `/api/artists/*` - Artist profiles

## Known Issues
1. Network errors during signup attempts
2. React hydration warnings
3. Form validation improvements needed
4. API integration needs error handling

## Next Steps
1. Implement album-first upload flow
2. Complete media player states
3. Build artist profile pages
4. Setup proper authentication flow

## Testing Notes
- Test media player state transitions
- Verify upload flow completion
- Check responsive design
- Validate player state management
