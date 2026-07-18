import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { heroPhoto } from '../weddingPhotos';

export default function Hero() {
  // Wedding Date: Sept 13, 2026
  const weddingDate = new Date('2026-09-13T10:30:00+05:30'); // Indian Standard Time (IST)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark & Warm Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 filter blur-[1px]"
        style={{ 
          backgroundImage: `url(${heroPhoto})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-950/80 via-royal-950/70 to-gold-50/100 z-1" />

      {/* Hero Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-32 flex flex-col items-center">
        {/* Top Decorative Motif */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-16 h-16 md:w-20 md:h-20 mb-6"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold-300 drop-shadow-md">
            <path d="M50 0 C40 30 10 40 0 50 C10 60 40 70 50 100 C60 70 90 60 100 50 C90 40 60 30 50 0 Z" />
            <circle cx="50" cy="50" r="5" className="fill-royal-800" />
          </svg>
        </motion.div>

        {/* Save The Date badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="px-6 py-2 border border-gold-300/40 rounded-full bg-royal-950/40 backdrop-blur-sm text-gold-300 uppercase tracking-widest text-xs md:text-sm font-medium mb-8"
        >
          We Are Getting Married
        </motion.div>

        {/* Groom & Bride Names */}
        <div className="relative mb-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-100 font-bold tracking-wide drop-shadow-lg leading-none"
          >
            Akhil <span className="font-serif italic font-light text-gold-300 text-4xl sm:text-6xl md:text-7xl lg:text-8xl mx-2">&</span> Anjitha
          </motion.h1>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent mx-auto mt-6" />
        </div>

        {/* Wedding Highlights Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold-200 text-sm md:text-lg tracking-wide font-light mb-12 bg-royal-900/40 backdrop-blur-sm p-4 rounded-xl border border-gold-400/20 shadow-md"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-gold-400" />
            <span>September 13, 2026</span>
          </div>
          <div className="hidden md:block w-[1px] h-6 bg-gold-400/30 self-center" />
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-gold-400" />
            <span>Palakkad, Kerala</span>
          </div>
        </motion.div>

        {/* Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-gold-200/50"
        >
          <h3 className="font-serif text-royal-800 text-xl md:text-2xl mb-6 tracking-wider uppercase flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-gold-500" />
            {timeLeft.isOver ? "Happily Married!" : "Counting Down to the Big Day"}
          </h3>

          <div className="grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex flex-col items-center bg-gold-50/50 p-3 md:p-5 rounded-xl border border-gold-200/30"
              >
                <div className="font-serif text-3xl md:text-5xl font-bold text-royal-700 tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-gold-700 mt-2 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Wave/Transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gold-50 to-transparent z-10" />
    </section>
  );
}
