import { UploadChoice } from "@/components/upload/upload-choice"

export default function UploadPage({ uploadType }: { uploadType?: boolean }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-6 md:py-8">
        <div className="space-y-6">
          <UploadChoice />
        </div>
      </div>
    </div>
  )
}

