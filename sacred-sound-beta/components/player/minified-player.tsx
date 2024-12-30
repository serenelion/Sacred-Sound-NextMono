"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Heart, MoreHorizontal, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { usePlayer } from "@/contexts/player-context"
import { formatTime } from "@/lib/utils"

export function MinifiedPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    seek,
  } = usePlayer()

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-md">
      <div className="relative">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={([value]) => seek(value)}
          className="absolute -top-2 w-full"
        />
        <div className="container flex items-center h-16 gap-4 px-4">
          <div className="flex items-center gap-4 flex-1 min-w-0 max-w-[300px]">
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-sm">
                {currentTrack.title}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {currentTrack.artist}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-center">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={togglePlay} className="h-8 w-8">
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-[300px]">
            <div className="hidden sm:flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                defaultValue={[100]}
                max={100}
                step={1}
                className="w-[100px]"
              />
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

