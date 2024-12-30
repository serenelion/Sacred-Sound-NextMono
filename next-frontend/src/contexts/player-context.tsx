
"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  mediaUrl: string
  type: "audio" | "video"
  duration: string
}

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  isFullscreen: boolean
  currentTime: number
  duration: number
  volume: number
  play: (track: Track) => void
  pause: () => void
  togglePlay: () => void
  toggleFullscreen: () => void
  seek: (time: number) => void
  setVolume: (value: number) => void
  mediaRef: React.RefObject<HTMLAudioElement | HTMLVideoElement>
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaRef.current) {
      const media = mediaRef.current
      media.volume = volume

      const handleTimeUpdate = () => setCurrentTime(media.currentTime)
      const handleDurationChange = () => setDuration(media.duration)
      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }
      const handleError = (e: Event) => {
        console.error('Error loading media:', e)
        setIsPlaying(false)
      }

      media.addEventListener('timeupdate', handleTimeUpdate)
      media.addEventListener('durationchange', handleDurationChange)
      media.addEventListener('ended', handleEnded)
      media.addEventListener('error', handleError)

      return () => {
        media.removeEventListener('timeupdate', handleTimeUpdate)
        media.removeEventListener('durationchange', handleDurationChange)
        media.removeEventListener('ended', handleEnded)
        media.removeEventListener('error', handleError)
      }
    }
  }, [currentTrack, volume])

  const play = async (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (mediaRef.current) {
        await mediaRef.current.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      if (mediaRef.current) {
        try {
          await mediaRef.current.play()
        } catch (error) {
          console.error('Error playing media:', error)
          setIsPlaying(false)
        }
      }
    }
  }

  const pause = () => {
    if (mediaRef.current) {
      mediaRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause()
    } else if (currentTrack) {
      play(currentTrack)
    }
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const seek = (time: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isFullscreen,
        currentTime,
        duration,
        volume,
        play,
        pause,
        togglePlay,
        toggleFullscreen,
        seek,
        setVolume,
        mediaRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
