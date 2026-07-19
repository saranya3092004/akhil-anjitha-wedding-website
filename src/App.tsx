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
      <div className="font-playfair italic text-4xl md:text-6xl font-bold tracking-wide text-[#FAF3E0] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
  Akhil{" "}
  <span className="font-cormorant font-light text-[#C8A96A] mx-2">&</span>{" "}
  Anjitha
</div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ delay: 1.9, duration: 0.7 }}
          className="h-[1.5px] mx-auto mt-4"
          style={{ background: 'linear-gradient(90deg, transparent, #C97D3D, transparent)' }}
        />
        <div className="font-cormorant text-xs uppercase tracking-[0.3em] text-[#FAF3E0] mt-4">
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
      ? "bg-[#2B0F0F]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#C8A96A]/30"
      : "bg-transparent py-5"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">

    {/* Logo */}
    <button
      onClick={() => scrollToSection("home")}
      className="flex items-center gap-3 cursor-pointer group text-left bg-transparent border-0 p-0"
    >
      <div
        className="font-playfair italic text-2xl md:text-3xl font-bold tracking-wider text-[#FFF8E7] flex items-center gap-2 transition-all duration-300 group-hover:text-white"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
      >
        <span>A</span>

        <Heart
          className="w-4 h-4 text-[#E6C88C] fill-[#E6C88C]/40 group-hover:fill-[#E6C88C] group-hover:scale-125 transition-all duration-300"
        />

        <span>A</span>
      </div>

      <div className="hidden sm:block w-px h-5 bg-[#E6C88C]/40" />

      <span
        className="hidden sm:inline font-cormorant text-xs uppercase tracking-[0.25em] text-[#F7E7CE] font-semibold"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
      >
        Wedding Invitation
      </span>
    </button>

    {/* Desktop Navigation */}
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          className={`text-xs uppercase tracking-[0.18em] font-medium font-cormorant transition-all duration-300 relative py-1 bg-transparent border-0 ${
            activeSection === link.id
              ? "text-[#FFF8E7] font-semibold"
              : "text-[#F7E7CE] hover:text-white"
          }`}
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
        >
          {link.label}

          {activeSection === link.id && (
            <motion.div
              layoutId="activeNavIndicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6C88C] to-transparent"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </button>
      ))}
    </nav>

    {/* Mobile Menu */}
    <button
      onClick={() => setMobileMenuOpen(true)}
      className="lg:hidden text-[#FFF8E7] hover:text-[#E6C88C] transition-colors p-1.5 bg-transparent border-0"
      style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
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
<footer
  className="relative py-20 overflow-hidden border-t border-[#C8A96A]/20"
  style={{
    background: "linear-gradient(to bottom, #2B0F0F 0%, #170207 100%)",
  }}
>
  {/* Decorative circles */}
  <div className="absolute -bottom-32 -left-32 w-64 h-64 border border-[#E6C88C]/10 rounded-full" />
  <div className="absolute -top-32 -right-32 w-64 h-64 border border-[#E6C88C]/10 rounded-full" />

  <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center text-center">

    {/* Top Divider */}
    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#E6C88C] to-transparent mb-6" />

    {/* Heading */}
    <h2
      className="font-playfair italic text-3xl md:text-4xl font-semibold tracking-wide text-[#FFF8E7] mb-4"
      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
    >
      Thank You
    </h2>

    {/* Quote */}
    <p
      className="max-w-md text-base font-cormorant italic leading-relaxed text-[#F7E7CE] mb-8"
      style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
    >
      "Your presence, prayers, and beautiful blessings are the greatest gifts
      we could ever receive. We hope to celebrate this milestone together with
      you."
    </p>

    {/* Couple Names */}
    <div
      className="font-playfair italic text-3xl md:text-4xl font-bold tracking-wider text-[#FFF8E7] mb-2"
      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
    >
      Akhil{" "}
      <span className="font-cormorant font-light text-[#E6C88C]">
        &
      </span>{" "}
      Anjitha
    </div>

    {/* Date & Venue */}
    <div
      className="text-xs uppercase tracking-[0.25em] text-[#E6C88C] font-semibold font-cormorant"
      style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
    >
      September 13, 2026 • Palakkad, Kerala
    </div>

    {/* Bottom Divider */}
    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#E6C88C] to-transparent mt-8 mb-5" />

    {/* Copyright */}
    <p className="text-xs tracking-[0.15em] text-[#D8C8A8] font-cormorant">
      All Rights Reserved © 2026 • Made with ❤ for Akhil &amp; Anjitha
    </p>
  </div>
</footer>
      {/* Floating Music Player */}
      <MusicPlayer />

    </div>
  );
}
