
import React, { useState } from 'react';
import { Button } from './ui/button';

interface MediaPlayerProps {
  track: {
    title: string;
    artist: string;
    coverUrl: string;
    audioUrl: string;
  };
}

export const MediaPlayer = ({ track }: MediaPlayerProps) => {
  const [playerState, setPlayerState] = useState<'minified' | 'nowPlaying' | 'fullScreen'>('minified');
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const togglePlayerState = () => {
    const states: ('minified' | 'nowPlaying' | 'fullScreen')[] = ['minified', 'nowPlaying', 'fullScreen'];
    const currentIndex = states.indexOf(playerState);
    setPlayerState(states[(currentIndex + 1) % states.length]);
  };

  return (
    <div className={`fixed transition-all duration-300 ${
      playerState === 'minified' 
        ? 'bottom-0 left-0 h-16 w-full'
        : playerState === 'nowPlaying'
          ? 'bottom-0 left-0 h-80 w-full'
          : 'inset-0 h-full w-full'
    }`}>
      <div className="bg-black/90 text-white h-full w-full flex items-center p-4">
        <img 
          src={track.coverUrl} 
          alt={track.title}
          className={`${playerState === 'minified' ? 'h-12 w-12' : 'h-40 w-40'} object-cover`}
        />
        <div className="flex-1 px-4">
          <h3 className="font-semibold">{track.title}</h3>
          <p className="text-sm text-gray-400">{track.artist}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={togglePlay} variant="ghost">
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={togglePlayerState} variant="ghost">
            {playerState === 'minified' ? 'Expand' : 'Minimize'}
          </Button>
        </div>
      </div>
    </div>
  );
};
