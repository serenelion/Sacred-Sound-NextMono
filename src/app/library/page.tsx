
'use client'

import { LibraryPage } from '@/components/library-page'
import { PrivateRoute } from '@/components/private-route'
import { MediaPlayer } from '@/components/player/media-player'

export default function Library() {
  return (
    <PrivateRoute>
      <div className="flex flex-col h-screen">
        <LibraryPage />
        <MediaPlayer />
      </div>
    </PrivateRoute>
  )
}
