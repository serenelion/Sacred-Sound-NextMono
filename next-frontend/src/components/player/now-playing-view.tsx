"use client"

import { Button } from "@/components/ui/button"
import { Expand } from 'lucide-react'
import { usePlayer } from "@/contexts/player-context"
import Image from "next/image"

export function NowPlayingView() {
  const { currentTrack, toggleFullscreen } = usePlayer()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-16 right-4 z-30 transition-all duration-200 ease-in-out group">
      <div 
        className="relative w-[200px] aspect-square cursor-pointer bg-black rounded-lg overflow-hidden shadow-lg"
        onClick={toggleFullscreen}
      >
        {currentTrack.type === "video" ? (
          <video
            src={currentTrack.mediaUrl}
            className="w-full h-full object-contain"
            playsInline
            muted
          />
        ) : (
          <Image
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Expand className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}