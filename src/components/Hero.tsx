import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { heroPhoto } from '../weddingPhotos';

export default function Hero() {
  const weddingDate = new Date('2026-09-13T10:30:00+05:30');

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      });
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon-950">
{/* Background Image with Dark & Warm Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 filter blur-[1px]"
        style={{ 
          backgroundImage: `url(${heroPhoto})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-950/80 via-royal-950/70 to-gold-50/100 z-1" />

      {/* Thin emerald/champagne top & bottom rules */}
      <div className="absolute top-0 left-0 right-0 temple-border-top z-20" />
      <div className="absolute bottom-0 left-0 right-0 temple-border-top z-20" />

      {/* Background image, softened for a light theme */}
      {/* <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 filter blur-[2px] opacity-[0.14]"
        style={{ backgroundImage: `url(${heroPhoto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/90 via-maroon-950/70 to-maroon-950/95 z-0" /> */}

      {/* Subtle drifting leaf sprigs, replacing the mandala spin */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.06]">
        {[
          { top: '12%', left: '8%', size: 90, rotate: -18 },
          { top: '70%', left: '85%', size: 120, rotate: 24 },
          { top: '25%', left: '90%', size: 70, rotate: 8 },
          { top: '80%', left: '10%', size: 100, rotate: -30 },
        ].map((leaf, i) => (
          <svg
            key={i}
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 100 100"
            className="absolute"
            style={{ top: leaf.top, left: leaf.left, transform: `rotate(${leaf.rotate}deg)` }}
          >
            <path
              d="M50 5 C70 25 90 45 50 95 C10 45 30 25 50 5 Z"
              fill="none"
              stroke="#145F49"
              strokeWidth="1.5"
            />
            <line x1="50" y1="15" x2="50" y2="85" stroke="#145F49" strokeWidth="1" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-32 pb-24 flex flex-col items-center">

        {/* Simple emerald monogram wreath, replacing the gold flame motif */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-14 h-14 md:w-16 md:h-16 mb-5"
        >
         <svg viewBox="0 0 100 100" className="w-full h-full">
  <text
    x="50"
    y="62"
    textAnchor="middle"
    fontSize="64"
    fontFamily="Noto Serif Devanagari, serif"
    fill="#cf640d"
    fontWeight="600"
  >
    ॐ
  </text>
</svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="px-6 py-1.5 border border-maroon-700/25 rounded-full bg-maroon-900/60 backdrop-blur-sm text-maroon-800 uppercase tracking-[0.25em] text-xs font-semibold mb-6 shadow-sm"
        >
          We Are Getting Married
        </motion.div>

        <div className="relative mb-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="font-playfair italic text-5xl sm:text-7xl md:text-8xl gold-gradient-text font-bold tracking-wide leading-tight"
          >
  Akhil{" "}
  <span className="font-cormorant font-light text-[#B08D57] mx-2">
    &
  </span>{" "}
  Anjitha       
</motion.h1>
          <div className="w-40 h-[1.5px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #856202, #d18615, #cf5e1d, transparent)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col md:flex-row gap-5 md:gap-10 text-maroon-800 text-sm md:text-base tracking-[0.15em] uppercase mb-12 bg-maroon-900/50 backdrop-blur-md px-6 py-4 rounded-md border border-maroon-700/15 shadow-md gold-border-glow"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-maroon-700" />
            <span className="font-cormorant font-bold">September 13, 2026</span>
          </div>
          <div className="hidden md:block w-[1px] h-5 bg-maroon-700/25 self-center" />
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-maroon-700" />
            <span className="font-cormorant font-bold">Palakkad, Kerala</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full max-w-xl bg-maroon-900/60 backdrop-blur-md rounded-lg p-5 md:p-6 border border-maroon-700/15 shadow-lg gold-border-glow relative"
        >
          <h3 className="font-cormorant text-maroon-800 text-lg md:text-xl mb-5 tracking-[0.2em] uppercase flex items-center justify-center gap-2 font-bold">
            <Clock className="w-4.5 h-4.5 text-maroon-700" />
            {timeLeft.isOver ? "Happily Married!" : "Counting Down to the Big Day"}
          </h3>

          <div className="grid grid-cols-4 gap-2.5 md:gap-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center bg-maroon-950/60 p-2.5 md:p-3.5 rounded border border-maroon-700/10">
                <div className="font-cormorant text-2xl md:text-4xl font-bold text-maroon-800 tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold-600 mt-1 font-semibold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="font-cormorant text-maroon-700/80 text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
          <div className="w-5 h-8 rounded-full border border-maroon-700/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 bg-maroon-700 rounded-full"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}