'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Maximize2, Minimize2, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface AudioPlayerProps {
  track: {
    title: string
    artist: string
    coverUrl: string
    audioUrl: string
  }
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  function onTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function onLoadedMetadata() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const playerClass = isFullscreen 
    ? "fixed inset-0 z-50 bg-background" 
    : "fixed bottom-16 md:bottom-0 left-0 right-0 z-50" // Add bottom-16 for mobile to account for bottom nav

  return (
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <Card className={playerClass}>
        <CardContent className={`flex items-center gap-4 p-4 ${isFullscreen ? 'h-screen' : ''}`}>
          <div className={`relative ${isFullscreen ? 'w-[300px] h-[300px]' : 'w-12 h-12'}`}>
            <Image
              src={track.coverUrl}
              alt={`${track.title} cover`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="font-medium">{track.title}</span>
              <span className="text-sm text-muted-foreground">{track.artist}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={([value]) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = value
                  }
                }}
                className="flex-1"
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button onClick={togglePlay} size="icon">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={([value]) => setVolume(value / 100)}
                className="w-24"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

