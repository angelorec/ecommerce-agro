"use client";

import { useEffect, useRef, useState } from "react";

export function useSound(soundUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      const audio = new Audio(soundUrl);
      
      // Preload the audio file
      audio.load();
      
      const handleCanPlay = () => setIsReady(true);
      audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
      
      audioRef.current = audio;
      
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audioRef.current = null;
      };
    }
  }, [soundUrl]);

  const play = () => {
    if (audioRef.current) {
      // Reset time to allow rapid consecutive plays
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay policy was preventing the sound
          console.warn('Audio playback blocked by browser policy:', error);
        });
      }
    }
  };

  return { play, isReady };
}
