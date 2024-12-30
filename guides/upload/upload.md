# Frontend Upload Process Documentation

## Overview
The frontend upload process involves uploading audio or video files to Google Cloud Storage, saving the upload URL, and linking this information with the `ContentMetaData` stored in MongoDB. This process ensures that media files are properly stored and associated with the correct metadata for further processing and retrieval.

## Components Involved
- **Upload Component**: Handles file selection, upload initiation, and state management.
- **UploadsDetailsForm Component**: Manages metadata input and cover image uploads for each file.

## Process Flow

### 1. File Selection and Upload Initiation
- Users select files through a file input in the `Upload` component.
- Files are stored in a state array (`fileUploadsArray`) for tracking and processing.
- **Note**: Album creation is now a separate process and is not triggered by uploading multiple tracks. Users must explicitly initiate album creation through a dedicated interface or action.

### 2. Uploading Files to Google Cloud Storage
- Each file is processed in the `uploadFile` function within the `Upload` component.
- A unique `videoId` is generated for each file using `uuid`.
- The file is uploaded to Google Cloud Storage using Firebase's `uploadBytesResumable` method.
- Upload progress is tracked and updated in the UI.

### 3. Saving the Upload URL
- Once the upload is complete, the file's URL is retrieved using `getDownloadURL`.
- The URL is then used to update the `ContentMetaData` in MongoDB via the `updatePartialContentMetaData` API call.

### 4. Linking with ContentMetaData in MongoDB
- The `postContentMetaData` function is called to create an initial metadata entry in MongoDB with the `videoId`.
- After the file is uploaded and the URL is obtained, `updatePartialContentMetaData` is called to update the MongoDB entry with the file URL and other metadata.

### 5. Handling Metadata and Cover Images
- The `UploadsDetailsForm` component allows users to input additional metadata such as title, description, and category.
- Users can upload a cover image, which is also stored in Google Cloud Storage and linked to the `ContentMetaData` via the `postCoverImage` API call.

## API Endpoints
- **POST /api/postContentMetaData**: Creates a new metadata entry in MongoDB.
- **POST /api/updatePartialContentMetaData**: Updates the metadata entry with the file URL.
- **POST /api/postCoverImage**: Updates the metadata entry with the cover image URL.

## Security Considerations
- Ensure all API calls are made over HTTPS to protect data in transit.
- Validate and sanitize all user inputs to prevent injection attacks.
- Use secure authentication mechanisms to protect access to Google Cloud Storage and MongoDB.

This documentation provides a comprehensive overview of the frontend upload process, detailing each step from file selection to metadata linking, ensuring a seamless and secure media management workflow.