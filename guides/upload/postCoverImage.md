# Cover Image Upload Integration Guide

## Endpoint Overview
`POST /api/postCoverImage`

## Purpose
Updates a content metadata entry with a cover image URL after uploading the image to Firebase Storage.

## Integration Flow

### 1. Function Implementation
javascript
const postCoverImage = async (file, videoId) => {
try {
// 1. Upload image to Firebase
const fileUploadName = ${v4()}_${file.name};
const storageRef = ref(storage, CoverImages/${userEmail}/${fileUploadName});
// Upload file
await uploadBytes(storageRef, file);
// Get download URL
const downloadURL = await getDownloadURL(storageRef);
// 2. Update metadata with cover image URL
const response = await axios.post(
${process.env.REACT_APP_API_BASE_URL}/api/postCoverImage,
{
videoId,
coverImageUrl: downloadURL
}
);
return response.data;
} catch (error) {
console.error('Error uploading cover image:', error);
throw error;
}
};


### 2. Required Parameters
- `file` (File object): The cover image file to upload
- `videoId` (string): The unique identifier of the content
- `coverImageUrl` (string): Firebase storage URL (generated after upload)

### 3. Storage Path Structure
CoverImages/${userEmail}/${uuid}${filename}

### 4. Response Structure
javascript
{
status: 200,
result: {
value: {
videoId: string,
coverImageUrl: string,
// ... other metadata
}
}
}

## Implementation Steps

### 1. File Selection
javascript
const handleFileSelect = (event) => {
const file = event.target.files[0];
if (validateImageFile(file)) {
uploadCoverImage(file);
}
};

### 2. Image Validation
javascript
const validateImageFile = (file) => {
// Check file type
const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!validTypes.includes(file.type)) {
throw new Error('Invalid file type');
}
// Check file size (e.g., 5MB limit)
const maxSize = 5 1024 1024;
if (file.size > maxSize) {
throw new Error('File too large');
}
return true;
};

### 3. Upload Process
javascript
const uploadCoverImage = async (file) => {
try {
setUploadingCover(true);
await postCoverImage(file, videoId);
setUploadingCover(false);
// Handle success
} catch (error) {
setUploadingCover(false);
// Handle error
}
};

## UI Components

### 1. File Input
javascript
<input
type="file"
accept="image/jpeg,image/png,image/webp"
onChange={handleFileSelect}
style={{ display: 'none' }}
ref={fileInputRef}
/>


### 2. Drop Zone


javascript
<DropZone
onDrop={handleFileDrop}
accept={['image/jpeg', 'image/png', 'image/webp']}
maxSize={5 1024 1024}
/>

## Error Handling
javascript
try {
await postCoverImage(file, videoId);
} catch (error) {
switch (error.code) {
case 'storage/unauthorized':
// Handle unauthorized
break;
case 'storage/canceled':
// Handle canceled upload
break;
default:
// Handle other errors
}
}

## Best Practices
1. Validate image files before upload
2. Show upload progress indicator
3. Implement retry mechanism for failed uploads
4. Cache successful uploads
5. Compress images if needed
6. Handle upload cancellation

## Security Considerations
1. Validate file types server-side
2. Implement file size limits
3. Use secure Firebase storage rules
4. Verify user authentication
5. Sanitize file names

## Related Operations
- Content metadata updates
- Album cover management
- Thumbnail generation
- Image optimization

## Dependencies
- Firebase Storage
- UUID generation
- Axios for HTTP requests
- Image processing libraries (optional)
