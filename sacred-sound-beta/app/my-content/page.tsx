import { ContentGrid } from "@/components/my-content/content-grid"

export default function MyContentPage() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-auto">
        <div className="container px-4 py-6">
          <ContentGrid />
        </div>
      </main>
    </div>
  )
}

