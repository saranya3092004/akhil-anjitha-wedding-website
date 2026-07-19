import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import weddingMusic from '../music/music.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch((error) => {
          console.log('Audio playback prevented or failed:', error);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none" id="music-player-container">
      {/* Invisible HTML5 Audio Element */}
      <audio ref={audioRef} loop preload="auto">
  <source src={weddingMusic} type="audio/mpeg" />
</audio>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-gold-200 shadow-lg text-[11px] font-medium text-gold-800 flex items-center gap-1.5 pointer-events-auto"
            id="music-tooltip"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
            <span>Play romantic music 🌸</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="ml-1 text-gold-400 hover:text-gold-600 transition-colors cursor-pointer text-xs font-bold font-sans"
              id="close-music-tooltip"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`pointer-events-auto flex items-center justify-center gap-2.5 p-3.5 rounded-full shadow-xl transition-all cursor-pointer relative ${
          isPlaying 
            ? 'burgundy-gradient text-white ring-2 ring-gold-300' 
            : 'bg-white hover:bg-gold-50 text-royal-700 border border-gold-200/60'
        }`}
        id="music-toggle-btn"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {/* Pulse effect when paused to invite user to play */}
        {!isPlaying && (
          <div className="absolute inset-0 rounded-full border-2 border-gold-400/40 animate-ping pointer-events-none" />
        )}

        {/* Music Bars Visualizer */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-end gap-[3px] h-3.5 px-0.5 overflow-hidden"
              id="music-visualizer"
            >
              <motion.div 
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                className="w-0.5 bg-gold-300 rounded-full"
              />
              <motion.div 
                animate={{ height: ["50%", "100%", "50%"] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }}
                className="w-0.5 bg-white rounded-full"
              />
              <motion.div 
                animate={{ height: ["30%", "100%", "30%"] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut", delay: 0.3 }}
                className="w-0.5 bg-gold-300 rounded-full"
              />
              <motion.div 
                animate={{ height: ["60%", "100%", "60%"] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.05 }}
                className="w-0.5 bg-white rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <span className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-gold-200" />
          ) : (
            <VolumeX className="w-5 h-5 text-gold-500" />
          )}
        </span>
      </motion.button>
    </div>
  );
}
