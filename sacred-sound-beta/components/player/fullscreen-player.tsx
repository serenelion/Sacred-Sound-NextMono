"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Minimize2, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { usePlayer } from "@/contexts/player-context"
import Image from "next/image"
import { formatTime } from "@/lib/utils"

export function FullscreenPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    toggleFullscreen,
    seek,
    mediaRef,
  } = usePlayer()

  if (!currentTrack) return null

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center bg-black">
          {currentTrack.type === "video" ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={currentTrack.mediaUrl}
              className="w-full h-full object-contain"
              playsInline
            />
          ) : (
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="p-4 space-y-4 bg-background/80 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold">{currentTrack.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentTrack.artist}
              </p>
            </div>
            <Button size="icon" variant="ghost" onClick={toggleFullscreen}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={([value]) => seek(value)}
            />
            <div className="flex justify-between text-sm tabular-nums text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                defaultValue={[100]}
                max={100}
                step={1}
                className="w-[120px]"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button size="icon" onClick={togglePlay} className="h-12 w-12">
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
            <div className="w-[120px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

