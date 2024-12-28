
# Sacred Sound Platform - Documentation

## Pages

### Public Pages
- `/` - Landing page with waitlist signup
- `/create` - Artist landing page with platform overview
- `/artistSignup` - Artist account creation page
- `/login` - User authentication page
- `/forgot-password` - Password reset request page
- `/reset-password` - Password reset confirmation page

### Authenticated Pages
- `/library` - User's main content library and recommendations
- `/upload` - Artist content upload interface with album-first flow
- `/artist/[artistId]` - Artist profile and content showcase
- `/album/[albumId]` - Album details and track listing
- `/track/[trackId]` - Individual track playback and details
- `/modify/album/[albumId]` - Album metadata editing interface
- `/modify/track/[trackId]` - Track metadata editing interface

## Components

### Authentication
- `LoginForm` - Email/password authentication
- `SignupForm` - New artist account creation
- `PasswordResetForm` - Password recovery flow

### Media Player
- `NowPlaying` - Standard playback controls and queue
- `MiniPlayer` - Collapsed player with basic controls
- `FullscreenPlayer` - Immersive playback experience

### Upload System
- `AlbumCreator` - Album metadata and cover art upload
- `TrackUploader` - Audio file upload with progress
- `MetadataForm` - Track information editor

### Layout
- `Header` - Navigation and user controls
- `Sidebar` - Content browsing menu
- `Footer` - Platform information

### Shared
- `Button` - Reusable button styles
- `Input` - Form input components
- `Card` - Content display container
- `Alert` - User notifications
- `Accordion` - Collapsible content sections

## API Endpoints

### Authentication
- `POST /api/signup` - Create new artist account
- `POST /api/login` - User authentication
- `POST /api/logout` - Session termination
- `POST /api/reset-password` - Password reset

### Content Management
- `POST /api/albums/create` - Create new album
- `PUT /api/albums/[albumId]` - Update album metadata
- `POST /api/tracks/upload` - Upload track audio
- `PUT /api/tracks/[trackId]` - Update track metadata
- `DELETE /api/tracks/[trackId]` - Remove track

### User Data
- `GET /api/library` - Fetch user's content library
- `GET /api/artists/[artistId]` - Get artist profile
- `GET /api/albums/[albumId]` - Get album details
- `GET /api/tracks/[trackId]` - Get track details

### Utilities
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/getCheckAccountName` - Validate username availability
