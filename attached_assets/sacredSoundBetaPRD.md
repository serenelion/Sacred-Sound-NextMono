# Sacred Sound Platform - Product Requirement Document

## Project Overview

The Sacred Sound platform is designed to support sacred music artists by providing a comprehensive suite of tools for music streaming, artist profiles, and content management. The goal is to integrate the new frontend with the existing backend to ensure a seamless user experience.

## Objectives and Key Results

- **Beta Testing**: Begin beta testing by January 1.
  - Deploy the new frontend app with Replit agent by Monday at 4:27 PM.
  - Ensure complete integration with backend services.
  - Share the link with Vis by Wednesday at sunset.

## Functional Requirements

### Landing Pages

- **Waitlist for Listeners**: Visitors should be able to join the waitlist.
- **Beta Signup for Artists**: Artists with the `/create` link should be able to sign up as an artist.

### User Authentication

- **Login/Signup**: Users should be able to log in and sign up using their email and password.
- **Password Reset**: Users should be able to request a password reset and update their password.

### Artist Beta Experience

- **Artist Signup**: Artists can sign up and create a profile.
- **Profile Management**: Artists can update their profile information and manage their content.
- **Content Management**:
  - **Upload Content**: Artists can upload music and videos.
  - **Content Metadata**: Artists can manage metadata for their content.

### Home Experience

- **Recommendation Lists**: Provide personalized content recommendations.
- **Artist Profiles**: Display detailed artist information.
- **Album Pages**: Showcase album details and tracks.
- **Track Pages**: Display individual track information.
- **Media Player**:
  - View states: Now playing, Minified, Full screen
  - **Bandwidth Detection and Adaptive Streaming**: 
    - Use the Network Information API to monitor connection strength.
    - Dynamically adjust playback quality using HLS.js.
- **Search**: Implement a search feature for easy content discovery.

## Routes

### Landing Pages
  - `/` - Landing Page
  - `/artistCreate` - Artist Landing Page
  - `/artistSignup` - Artist Signup

### Home Experience
  - `/library` - Library Page
  - `/track/:trackId` - Track Page
  - `/profile/:artistId` - Artist Profile
  - `/album/:albumId` - Album Page
  
### Artist Beta Experience
  - `/upload` - Upload Page
  - `/modifyAlbum/:albumId` - Album Modification
  - `/modifyTrack/:trackId` - Track Modification

### Authentication
  - `/login` - Login Page
  - `/forgot` - Forgot Password
  - `/resetPassword` - Reset Password


## Pages
- **Landing Page**: Information and signup for listeners.
- **Artist Landing Page**: Information and signup link for artists.
- **Artist Signup**: Signup page for artists.
- **Library Page**: Library page for listeners.
- **Track Page**: Track page for listeners.
- **Artist Profile**: Artist profile page for listeners.
- **Album Page**: Album page for listeners.
- **Upload Page**: Upload page for artists.
- **Modify Album**: Modify album page for artists.
- **Modify Track**: Modify track page for artists.
- **Login Page**: Login page for both listeners and artists.
- **Forgot Password**: Forgot password page for both listeners and artists.
- **Reset Password**: Reset password page for both listeners and artists.

## Components

- **Sidebar**: Navigation for the application. The sidebar is present in the following endpoints: `/library`, `/track/:trackId`, `/profile/:artistId`, `/album/:albumId`
- **Media Player**: Playback controls and display. It has the following states: Now playing, Minified, Full screen. The Media Player is present in the following endpoints: `/library`, `/track/:trackId`, `/profile/:artistId`, `/album/:albumId`
- **Upload**: Upload component for artists. The Upload component is present in the following endpoints: `/upload`. The Upload component allow artist to create two type of document: albums and tracks. The tracks have the following fields: Title, Description, Category, Genre, Featured instruments, Language, Vocals type, Intention, Mood, Tags (max 5). It upload the media files to the backend and send the metadata to the backend. The albums have the following fields: Title, cover and description. It upload the cover image to the backend and send the metadata to the backend. The Upload component has the following states: Chose album or track to add, add album details and upload tracks, upload tracks. For UI purposes follow the 'Track Details Component Documentation'.md file that is linked below.
- **Content Management**: View a list of the artist's uploaded tracks and albums, edit metadata, upload images for the artist's tracks and albums. The metadata fields for tracks are : Name, Category, Genre, Featured instruments, Language, Vocals type, Intention, Mood, Tags (max 5). The metadata fields for albums are : Title, cover and description.

## API Endpoints
You are connecting a frontend React app with a Node.js express server. All the endpoints are prefixed with 'process.env.REACT_APP_API_BASE_URL' before the `/api/${endpoint}`. Here is an example of a route : `${process.env.REACT_APP_API_BASE_URL}/api/signup`. 
- **User Authentication**:
  - `/api/signup`
  - `/api/login`
  - `/api/request-password-reset`
  - `/api/reset-password`

- **Content Management**:
  - `/api/upload/video`
  - `/api/postContentMetaData`
  - `/api/postCreateImageThumbnail`

- **User Interaction**:
  - `/api/getUserPlaybackHistory`
  - `/api/updateUserPlaybackHistory`
  - `/api/getUserFavorites`
  - `/api/updateUserFavorites`

## Documentation


