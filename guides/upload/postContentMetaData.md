# Content Metadata Creation Integration Guide

## Endpoint Overview
`POST /api/postContentMetaData`

## Purpose
Creates and updates metadata entries in MongoDB for uploaded content in a two-step process:
1. Initial creation with basic metadata before upload
2. Update with final fileUrl after successful upload

## Two-Step Process Flow

### Step 1: Initial Metadata Creation
javascript
// First call - Create initial metadata record
const initialMetadata = await postContentMetaData(
videoId,
null, // fileUrl is null initially
fileObj
);
const isAudioOnly = fileObj.data.type.startsWith('audio/');
try {
const response = await fetch(${BASE_URL}/api/postContentMetaData, {
method: 'POST',
body: JSON.stringify({
owner: userEmail,
videoId,
timestamp: new Date().toISOString(),
fileUrl: null,
isOnlyAudio: isAudioOnly,
b_isPreparedForReview: false,
b_hasBeenReviewed: false,
b_isApproved: false,
visibility: true,
category: 'Studio recording'
})
});
// Store videoId for Step 2
} catch (error) {
console.error('Initial metadata creation failed:', error);
}


### Step 2: Update with File URL
javascript
// Second call - Update with file URL after upload
const updatePartialContentMetaData = async (videoId, fileUrl) => {
try {
const response = await axios.post(
${BASE_URL}/api/updatePartialContentMetaData,
{
videoId: videoId,
fileUrl: fileUrl,
}
);
console.log('Update successful:', response.data);
} catch (error) {
console.error('Error updating content meta data:', error);
}
};

## Implementation Flow
1. **Initial Creation**
   - Generate videoId
   - Determine isAudioOnly from file type
   - Create initial metadata record
   - Store videoId for later use

2. **File Upload**
   - Upload file to Firebase
   - Get download URL

3. **Metadata Update**
   - Update metadata with file URL
   - Complete the content creation process

## Required Parameters

### Initial Creation
- `owner` (string, required): User's email from AuthContext
- `videoId` (string, required): Unique identifier (UUID v4)
- `timestamp` (string, required): ISO timestamp
- `isOnlyAudio` (boolean, required): Based on file.type
- `fileUrl` (null): Initially null
- Other status flags (review, approval, etc.)

### Update
- `videoId` (string, required): Same as initial creation
- `fileUrl` (string, required): Firebase storage URL

## Response Structures

### Initial Creation Response
json
{
"status": 200,
"result": {
"acknowledged": true,
"insertedId": "mongoDB_generated_id"
}
}

### Update Response
json
{
"status": 200,
"result": {
"value": {
"videoId": "string",
"fileUrl": "string",
// ... other metadata
}
}
}

## Error Handling
javascript
try {
// Step 1: Initial Creation
const initialMetadata = await postContentMetaData(videoId, null, fileObj);
if (!initialMetadata) throw new Error('Initial metadata creation failed');
// File Upload Process
const fileUrl = await uploadToFirebase(fileObj);
// Step 2: Update with URL
await updatePartialContentMetaData(videoId, fileUrl);
} catch (error) {
console.error('Content creation process failed:', error);
// Implement cleanup if necessary
}


## Security Considerations
1. Verify AuthContext in both steps
2. Validate file types before initial creation
3. Verify Firebase upload success before update
4. Maintain consistent videoId between steps
5. Handle partial completion scenarios

## Related Operations
- Firebase storage upload
- Thumbnail generation
- Album association
- Review status updates

## Dependencies
- AuthContext
- UUID generation
- Firebase Storage
- MongoDB connection
- Axios for HTTP requests