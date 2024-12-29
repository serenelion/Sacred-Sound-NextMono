
# Upload Process Documentation

## Overview
The Upload system provides a streamlined workflow for artists to upload audio/video content and create albums. It supports both single track uploads and batch album creation with an intuitive drag-and-drop interface.

## User Flow
1. **Initial Upload**
   - Drag & drop files or use file picker
   - Supports MP4, MOV, WAV, MP3 formats
   - Option to create album from multiple files

2. **Album Creation**
   - Title and description entry
   - Cover image upload
   - Visibility settings (public/private)
   - Track reordering via drag & drop

3. **Track Details**
   - Individual metadata for each track
   - Progress tracking during upload
   - Deletion capability

## Technical Implementation

### State Management
- View state controls (`initial`, `albumCreation`, `fileDetail`)
- Upload progress tracking per file
- Album order management
- File status monitoring

### Firebase Storage Structure
```
/Uploads/{userEmail}/{videoId}
/AlbumPictures/{userEmail}/{fileUploadName}
```

### API Endpoints

#### Content Management
- `POST /api/postContentMetaData`
  - Creates initial metadata record
  - Params: videoId, fileUrl, isOnlyAudio

- `POST /api/updatePartialContentMetaData`
  - Updates content metadata after upload
  - Params: videoId, fileUrl

#### Album Management
- `POST /api/postNewAlbum`
  - Creates new album record
  - Params: owner, albumId, timestamp

- `POST /api/postAlbumImage`
  - Updates album cover image
  - Params: albumId, albumImageUrl

- `POST /api/updateReviewStatus`
  - Triggers review process
  - Params: videoId, b_isPreparedForReview

### Upload Process Flow
1. File selection triggers state change
2. Generate unique videoId
3. Upload to Firebase Storage
4. Create metadata record
5. Track upload progress
6. Update file status on completion
7. Handle review status updates

### Error Handling
- Upload failures with retry capability
- Invalid file type validation
- Network error management
- Progress tracking reliability

### Dependencies
- Firebase Storage for file hosting
- React Beautiful DnD for track reordering
- Axios for API requests
- UUID for unique ID generation
