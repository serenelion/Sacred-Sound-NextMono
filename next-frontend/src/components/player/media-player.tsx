
"use client"

import { usePlayer } from "@/contexts/player-context"
import { MinifiedPlayer } from "./minified-player"
import { FullscreenPlayer } from "./fullscreen-player"

export function MediaPlayer() {
  const { currentTrack, isFullscreen, mediaRef } = usePlayer()

  if (!currentTrack) return null

  return (
    <>
      {isFullscreen ? <FullscreenPlayer /> : <MinifiedPlayer />}
      {currentTrack.type === "audio" ? (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          src={currentTrack.mediaUrl}
          className="hidden"
        />
      ) : (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={currentTrack.mediaUrl}
          className="hidden"
          playsInline
        />
      )}
    </>
  )
}
