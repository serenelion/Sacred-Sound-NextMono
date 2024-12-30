"use client"

import { usePlayer } from "@/contexts/player-context"
import { MinifiedPlayer } from "./minified-player"
import { FullscreenPlayer } from "./fullscreen-player"
import { NowPlayingView } from "./now-playing-view"

export function MediaPlayer() {
  const { currentTrack, isFullscreen, mediaRef, isPlaying } = usePlayer()

  if (!currentTrack) return null

  return (
    <>
      <NowPlayingView />
      {isFullscreen ? <FullscreenPlayer /> : <MinifiedPlayer />}
      {currentTrack.type === "audio" && (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          src={currentTrack.mediaUrl}
          className="hidden"
        />
      )}
    </>
  )
}

