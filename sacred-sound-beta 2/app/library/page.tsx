import RecentUploads from "@/components/library/recent-uploads"
import { ContentGrid } from "@/components/library/content-grid"

export default function LibraryPage() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-auto">
        <div className="container px-4 py-6 space-y-8">
          <RecentUploads />
          <ContentGrid />
        </div>
      </main>
    </div>
  )
}

