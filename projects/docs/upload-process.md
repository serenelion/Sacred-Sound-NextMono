
# Upload Process Documentation

## Overview
The Upload system provides a streamlined workflow for artists to create albums and upload content. The album-first approach ensures proper organization of content from the beginning of the upload process.

## User Flow
1. **Album Creation**
   - Title and description entry
   - Cover image upload
   - Visibility settings (public/private)
   - Album metadata setup

2. **Media Upload**
   - Drag & drop files or use file picker
   - Supports MP4, MOV, WAV, MP3 formats
   - Batch upload capability

3. **Track Details**
   - Individual metadata for each track
   - Progress tracking during upload
   - Track reordering via drag & drop
   - Deletion capability

## Technical Implementation

### State Management
- View state controls (`albumCreation`, `mediaUpload`, `fileDetail`)
- Upload progress tracking per file
- Album order management
- File status monitoring

### Firebase Storage Structure
```
/Uploads/{userEmail}/{videoId}
/AlbumPictures/{userEmail}/{fileUploadName}
```

### API Endpoints

#### Album Management
- `POST /api/postNewAlbum`
  - Creates new album record
  - Params: owner, albumId, timestamp

- `POST /api/postAlbumImage`
  - Updates album cover image
  - Params: albumId, albumImageUrl

#### Content Management
- `POST /api/postContentMetaData`
  - Creates initial metadata record
  - Params: videoId, fileUrl, isOnlyAudio

- `POST /api/updatePartialContentMetaData`
  - Updates content metadata after upload
  - Params: videoId, fileUrl

- `POST /api/updateReviewStatus`
  - Triggers review process
  - Params: videoId, b_isPreparedForReview

### Upload Process Flow
1. Create album with basic metadata
2. Upload album cover image
3. File selection for tracks
4. Generate unique videoId per track
5. Upload tracks to Firebase Storage
6. Create metadata records
7. Track upload progress
8. Update file status on completion
9. Handle review status updates

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
