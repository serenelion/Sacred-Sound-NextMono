import { AppSidebar } from "@/components/layout/app-sidebar"
import { MediaPlayer } from "@/components/player/media-player"
import { PlayerProvider } from "@/contexts/player-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <PlayerProvider>
          <div className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-hidden relative">
              <div className="h-full overflow-auto pb-16">
                {children}
              </div>
              <MediaPlayer />
            </main>
          </div>
        </PlayerProvider>
      </body>
    </html>
  )
}

