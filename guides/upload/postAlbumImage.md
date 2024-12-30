# Album Image Upload Integration Guide

## Endpoint Overview
`POST /api/postAlbumImage`

## Purpose
Updates an album's metadata with a cover image URL after uploading to Firebase Storage.

## Implementation

javascript
const postAlbumImage = async (file, albumId) => {
try {
// 1. Upload to Firebase Storage
const fileUploadName = ${v4()}_${file.name};
const storageRef = ref(storage, AlbumPictures/${userEmail}/${fileUploadName});
await uploadBytes(storageRef, file);
// 2. Get download URL
const albumImageUrl = await getDownloadURL(storageRef);
// 3. Update album metadata
const response = await axios.post(
${process.env.REACT_APP_API_BASE_URL}/api/postAlbumImage,
{
albumId,
albumImageUrl
}
);
return response.data;
} catch (error) {
console.error('Error uploading album image:', error);
throw error;
}
};


## Required Parameters
- `albumId` (string): Album's unique identifier
- `albumImageUrl` (string): Firebase storage URL for the uploaded image

## Storage Path
`AlbumPictures/${userEmail}/${uuid}_${filename}`

## Response Structure
javascript
{
status: 200,
result: {
value: {
albumId: string,
albumImageUrl: string,
// other album metadata...
}
}
}

## File Validation
javascript
const validateAlbumImage = (file) => {
const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 2 1024 1024; // 2MB
if (!validTypes.includes(file.type)) {
throw new Error('Invalid file type');
}
if (file.size > maxSize) {
throw new Error('File too large');
}
return true;
};

## Usage Example
javascript
const handleAlbumImageUpload = async (event) => {
const file = event.target.files[0];
if (validateAlbumImage(file)) {
try {
setUploading(true);
const result = await postAlbumImage(file, albumId);
onImageUploadSuccess(result);
} catch (error) {
handleUploadError(error);
} finally {
setUploading(false);
}
}
};

## Dependencies
- Firebase Storage
- UUID v4
- Axios

## Security Notes
- Verify user owns the album
- Validate file types and size
- Use HTTPS for API calls
- Implement proper Firebase storage rules