# Partial Content Metadata Update Integration Guide

## Endpoint Overview
`POST /api/updatePartialContentMetaData`

## Purpose
Updates an existing content metadata entry in MongoDB with new file URL information after successful upload to Firebase storage.

## Integration Flow

### 1. Function Implementation
javascript
const updatePartialContentMetaData = async (videoId, fileUrl) => {
try {
const response = await axios.post(${process.env.REACT_APP_API_BASE_URL}/api/updatePartialContentMetaData, {
videoId,
fileUrl
});
console.log('Metadata update successful:', response.data);
return response.data;
} catch (error) {
console.error('Error updating content metadata:', error);
throw error;
}
};

### 2. Required Parameters
- `videoId` (string, required): The unique identifier of the content
- `fileUrl` (string, required): The Firebase storage URL of the uploaded file

### 3. Usage Context
This endpoint should be called:
- After successful file upload to Firebase
- Before proceeding with any additional metadata updates
- When file URL needs to be associated with existing metadata

Reference implementation can be found in:
javascript:frontend/src/components/CloudStudioComponents/Upload.js
startLine: 301
endLine: 314

### 4. Response Structure
javascript
{
status: 200,
result: {
value: {
videoId: string,
fileUrl: string,
// ... other metadata fields
}
}
}

## Implementation Steps

1. **Pre-requisites**
   - Ensure videoId exists from initial metadata creation
   - Verify file upload completion
   - Obtain valid Firebase storage URL

2. **Error Handling**

javascript
try {
await updatePartialContentMetaData(videoId, fileUrl);
} catch (error) {
switch (error.response?.status) {
case 404:
// Handle missing metadata
break;
case 400:
// Handle invalid parameters
break;
default:
// Handle other errors
}
}


3. **Integration with Upload Flow**
4. javascript
const handleUploadComplete = async (videoId, uploadedFileUrl) => {
try {
// Update metadata with file URL
await updatePartialContentMetaData(videoId, uploadedFileUrl);
// Proceed with additional metadata updates if needed
onUploadSuccess(videoId);
} catch (error) {
handleUploadError(error);
}

## Best Practices
1. Always verify file upload completion before updating metadata
2. Maintain error handling consistency
3. Log successful updates for tracking
4. Implement retry logic for network failures
5. Validate URL format before sending

## Security Considerations
1. Verify file URL is from trusted Firebase storage
2. Ensure videoId matches original metadata
3. Implement proper error handling
4. Use HTTPS for all requests

## Related Operations
- Initial metadata creation
- File upload to Firebase
- Complete metadata updates
- Content status updates