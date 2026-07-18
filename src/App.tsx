import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart } from 'lucide-react';

import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import RSVPForm from './components/RSVPForm';
import AdminDashboard from './components/AdminDashboard';
import MusicPlayer from './components/MusicPlayer';
import FallingPetals from './components/FallingPetals';
import { heroPhoto } from './weddingPhotos';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to window scroll to style navigation bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlights
      const sections = ['home', 'story', 'events', 'gallery', 'guestbook', 'rsvp'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'events', label: 'Ceremony' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'guestbook', label: 'Guestbook' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    return (
      <div className="relative min-h-screen font-sans bg-maroon-950 text-gold-100 antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-200">
        <header className="bg-maroon-900/90 backdrop-blur-md border-b border-gold-400/30 py-4 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="flex items-center gap-2 cursor-pointer group text-left"
            >
              <div className="font-playfair italic text-2xl md:text-3xl font-bold tracking-wider text-gold-300 flex items-center gap-1.5">
                <span>A</span>
                <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20 group-hover:scale-125 transition-transform" />
                <span>A</span>
              </div>
              <div className="hidden sm:block w-[1px] h-5 bg-gold-400/30 self-center mx-1" />
              <span className="hidden sm:inline font-cormorant text-xs uppercase tracking-widest text-gold-400/80 font-semibold">
                Wedding Dashboard
              </span>
            </a>
            
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="text-xs font-semibold text-gold-300 hover:text-gold-400 transition-colors uppercase tracking-widest flex items-center gap-1.5"
            >
              ← Back to Invitation
            </a>
          </div>
        </header>
        <main className="min-h-[calc(100vh-73px)]">
          <AdminDashboard />
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans bg-maroon-950 text-gold-100 antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ---------------------------------------------------- */}
      {/* PRELOADER OVERLAY */}
      {/* ---------------------------------------------------- */}
   <AnimatePresence>
  {loading && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-maroon-950"
    >
      {/* Photo reveal — clipped wipe from left to right */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroPhoto}
          alt="Akhil & Anjitha"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/25 to-maroon-950/50" />
      </motion.div>

      {/* Thin terracotta wipe line trailing the reveal */}
      <motion.div
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 bottom-0 w-[3px] bg-gold-300 shadow-[0_0_20px_4px_rgba(201,125,61,0.6)]"
      />

      {/* Names fading in after the reveal completes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        className="relative z-10 text-center px-4"
      >
        <div className="font-playfair italic text-4xl md:text-6xl font-bold tracking-wide text-gold-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          Akhil <span className="font-cormorant font-light text-gold-200 mx-2">&</span> Anjitha
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="h-[1.5px] mx-auto mt-4"
          style={{ background: 'linear-gradient(90deg, transparent, #C97D3D, transparent)' }}
        />
        <div className="font-cormorant text-xs uppercase tracking-[0.3em] text-gold-200/80 mt-4">
          September 13, 2026
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Background Falling Petals rain */}
      <FallingPetals />

      {/* ---------------------------------------------------- */}
      {/* FLOATING HEADER NAVBAR */}
      {/* ---------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#2a0610]/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold-400/30' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Logo Monogram */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group text-left bg-transparent border-0 p-0"
          >
            <div className="font-playfair italic text-2xl md:text-3xl font-bold tracking-wider text-gold-300 flex items-center gap-1.5 group-hover:text-gold-200 transition-colors">
              <span>A</span>
              <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20 group-hover:scale-125 group-hover:fill-gold-400/40 transition-all" />
              <span>A</span>
            </div>
            <div className="hidden sm:block w-[1px] h-5 bg-gold-400/30 self-center mx-1" />
            <span className="hidden sm:inline font-cormorant text-xs uppercase tracking-widest text-gold-400 font-medium">
              Wedding Invitation
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs uppercase tracking-[0.18em] font-medium font-cormorant transition-all duration-300 relative py-1 cursor-pointer bg-transparent border-0 ${
                  activeSection === link.id
                    ? 'text-gold-100 font-bold'
                    : 'text-gold-300/80 hover:text-gold-100'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Open Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gold-300 hover:text-gold-100 transition-colors p-1.5 cursor-pointer bg-transparent border-0"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#120206]/75 backdrop-blur-md z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-maroon-950 border-l border-gold-400/20 shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-gold-400/20">
                  <div className="font-playfair italic text-2xl font-bold tracking-widest text-gold-300">
                    A & A
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gold-400 hover:text-gold-200 p-1 cursor-pointer bg-transparent border-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 pt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left text-sm uppercase tracking-widest font-bold py-2.5 border-b border-gold-500/10 transition-all cursor-pointer bg-transparent ${
                        activeSection === link.id
                          ? 'text-gold-100 border-gold-400/30 pl-2'
                          : 'text-gold-400 hover:text-gold-100'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center text-[10px] text-gold-400/60 font-semibold tracking-widest border-t border-gold-400/10 pt-6 font-cormorant">
                AKHIL & ANJITHA 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* SECTIONS BODY */}
      {/* ---------------------------------------------------- */}
      <main className="relative z-20">
        {/* 1. Hero / Countdown Section */}
        <Hero />

        {/* 2. About / Story Section */}
        <About />

        {/* 3. Events & Google Maps Section */}
        <Events />

        {/* 4. Photo Gallery Section */}
        <Gallery />

        {/* 5. Guestbook Messages Section */}
        <Guestbook />

        {/* 6. RSVP Response Card Form */}
        <RSVPForm />
      </main>

      {/* ---------------------------------------------------- */}
      {/* ROMANTIC FOOTER */}
      {/* ---------------------------------------------------- */}
      <footer className="relative py-20 overflow-hidden border-t border-gold-400/10" style={{ background: 'linear-gradient(to bottom, #2D0610, #170207)' }}>
        {/* Decorative elements */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border border-[#c9a84c]/5 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border border-[#c9a84c]/5 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-6" />
          
          <h2 className="font-playfair italic text-3xl font-semibold tracking-wider text-gold-200 mb-4">
            Thank You
          </h2>
          
          <p className="text-sm md:text-base text-gold-100/70 max-w-md font-cormorant italic leading-relaxed mb-8">
            "Your presence, prayers, and beautiful blessings are the greatest gifts we could ever receive. We hope to celebrate this milestone together with you."
          </p>

          <div className="font-playfair italic text-2xl font-bold tracking-widest text-gold-300 mb-1">
            Akhil & Anjitha
          </div>
          <div className="text-[10px] uppercase tracking-widest text-gold-400/80 font-semibold font-cormorant">
            September 13, 2026 • Palakkad, Kerala
          </div>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-8 mb-4" />
          <p className="text-[10px] text-gold-400/50 font-sans tracking-wider">
            All Rights Reserved © 2026. Made with Love.
          </p>
        </div>
      </footer>

      {/* Floating Music Player */}
      <MusicPlayer />

    </div>
  );
}
