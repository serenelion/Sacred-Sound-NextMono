
import { createContext, useContext, ReactNode } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { UploadType, AlbumDetails } from '@/types/upload'

interface UploadContextType {
  uploadType: UploadType
  setUploadType: (type: UploadType) => void
  albumDetails: AlbumDetails
  setAlbumDetails: (details: AlbumDetails) => void
  files: ReturnType<typeof useUpload>
}

const UploadContext = createContext<UploadContextType | null>(null)

export function UploadProvider({ children }: { children: ReactNode }) {
  const upload = useUpload()
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
    title: '',
    description: '',
    artwork: null,
    tracks: []
  })

  return (
    <UploadContext.Provider value={{
      uploadType,
      setUploadType,
      albumDetails,
      setAlbumDetails,
      files: upload
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export function useUploadContext() {
  const context = useContext(UploadContext)
  if (!context) throw new Error('useUploadContext must be used within UploadProvider')
  return context
}
