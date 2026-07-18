import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Shield } from 'lucide-react';

import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import RSVPForm from './components/RSVPForm';
import AdminDashboard from './components/AdminDashboard';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

      // Simple active section highlights
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
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'guestbook', label: 'Guestbook' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    return (
      <div className="relative min-h-screen font-sans bg-gold-50 antialiased overflow-x-hidden selection:bg-gold-200 selection:text-gold-900">
        <header className="bg-white border-b border-gold-200/50 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="flex items-center gap-2 cursor-pointer group text-left"
            >
              <div className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-royal-800 flex items-center gap-1.5">
                <span>A</span>
                <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500/20 group-hover:scale-125 transition-transform" />
                <span>A</span>
              </div>
              <div className="hidden sm:block w-[1px] h-5 bg-gold-300 self-center mx-1" />
              <span className="hidden sm:inline font-serif text-xs uppercase tracking-widest text-gold-600 font-semibold">
                Wedding Invitation
              </span>
            </a>
            
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="text-xs font-semibold text-royal-700 hover:text-royal-800 transition-colors uppercase tracking-widest flex items-center gap-1.5"
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
    <div className="relative min-h-screen font-sans bg-gold-50 antialiased overflow-x-hidden selection:bg-gold-200 selection:text-gold-900">
      
      {/* ---------------------------------------------------- */}
      {/* FLOATING HEADER NAVBAR */}
      {/* ---------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gold-200/40' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Logo Monogram */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group text-left"
          >
            <div className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-royal-800 flex items-center gap-1.5">
              <span>A</span>
              <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500/20 group-hover:scale-125 transition-transform" />
              <span>A</span>
            </div>
            <div className="hidden sm:block w-[1px] h-5 bg-gold-300 self-center mx-1" />
            <span className="hidden sm:inline font-serif text-xs uppercase tracking-widest text-gold-600 font-semibold">
              Wedding Invitation
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative py-1 cursor-pointer flex items-center gap-1 ${
                  activeSection === link.id
                    ? 'text-royal-800'
                    : 'text-gold-700/80 hover:text-royal-800'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gold-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Open Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-royal-800 hover:text-gold-600 transition-colors p-1.5 cursor-pointer"
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
            className="fixed inset-0 bg-royal-950/40 backdrop-blur-md z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-gold-200 shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-gold-100">
                  <div className="font-serif text-2xl font-bold tracking-widest text-royal-800">
                    A & A
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gold-800 hover:text-royal-800 p-1 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 pt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`text-left text-sm uppercase tracking-widest font-bold py-2 border-b border-gold-50 transition-all cursor-pointer flex items-center gap-2 ${
                        activeSection === link.id
                          ? 'text-royal-800 border-gold-300 pl-2'
                          : 'text-gold-700/80 hover:text-royal-800'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center text-[10px] text-gold-500 font-semibold tracking-widest border-t border-gold-100 pt-6">
                AKHIL & ANJITHA 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------- */}
      {/* SECTIONS BODY */}
      {/* ---------------------------------------------------- */}
      <main>
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
      <footer className="burgundy-gradient text-white py-16 relative overflow-hidden">
        {/* Subtle decorative ring design */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border-4 border-white/5 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border-4 border-white/5 rounded-full" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-gold-300 mb-6" />
          
          <h2 className="font-serif text-4xl font-semibold tracking-wider text-gold-200 mb-4">
            Thank You
          </h2>
          
          <p className="text-sm text-gold-100/80 max-w-md font-serif italic leading-relaxed mb-8">
            "Your presence, prayers, and beautiful blessings are the greatest gifts we could ever receive. We hope to celebrate this milestone together with you."
          </p>

          <div className="font-serif text-2xl font-bold tracking-widest text-gold-300 mb-1">
            Akhil & Anjitha
          </div>
          <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
            September 13, 2026 • Palakkad, Kerala
          </div>

          <div className="w-12 h-[1px] bg-gold-300 mt-8 mb-4" />
          <p className="text-[10px] text-gold-400/60 font-sans tracking-wider">
            All Rights Reserved © 2026. Made with Love.
          </p>
        </div>
      </footer>

      {/* Floating Music Player */}
      <MusicPlayer />

    </div>
  );
}
