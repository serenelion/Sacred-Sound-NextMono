# Sacred Sound Upload Flow Documentation

## Component Hierarchy

### 1. UploadPage (`app/upload/page.tsx`)
- Root component for the upload flow
- Renders `<UploadChoice />` within a container

### 2. UploadChoice Component
**State:**
- `uploadType: 'album' | 'individual' | null`

**Flow:**
- Displays two card options:
  - Create an Album
  - Upload Individual Content
- When an option is selected, renders `<ContentUpload />` with the chosen type

### 3. ContentUpload Component
**Props:**
- `uploadType: 'album' | 'individual'`
- `onBack: () => void`

**State:**
- `albumDetails: { title: string; description: string; releaseDate: string }`
- `files: Array<File>`
- `error: string | null`
- `step: 'upload' | 'details'`

**Flow:**
1. Shows back button to return to upload choice
2. If album type, displays album details form
3. Shows technical requirements
4. Provides drag-and-drop upload area
5. Lists uploaded files
6. Shows QA process information
7. "Continue to Details" button appears after files are uploaded

### 4. TrackDetailsStep Component
**Props:**
- `files: Array<File>`
- `albumId: string | null`
- `onBack: () => void`

**State:**
- `currentTrackIndex: number`
- `isSubmitting: boolean`
- `trackDetails: Array<TrackMetadata>`

**Metadata Options:**
```typescript
interface TrackMetadata {
  title: string
  description: string
  category: string
  genre: string[]
  featuredInstruments: string[]
  primaryInstrument: string
  language: string[]
  deity: string[]
  tradition: string[]
  vocals: 'yes' | 'no'
  vocalTypes: {
    male: boolean
    female: boolean
    choir: boolean
    circle: boolean
  }
}