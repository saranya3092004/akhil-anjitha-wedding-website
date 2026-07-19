import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Image as ImageIcon, X } from 'lucide-react';
import { couplePhotos } from '../weddingPhotos';

const galleryDetails = [
  ['A Beautiful Beginning', 'A quiet moment together.'],
  ['Side by Side', 'A love that feels like home.'],
  ['Forever Starts Here', 'Cherishing every glance and smile.'],
  ['In Every Moment', 'Celebrating the joy of togetherness.'],
  ['Grace & Joy', 'A portrait filled with warmth.'],
  ['Together Always', 'A memory to treasure forever.'],
  ['A Gentle Moment', 'A tender pause in the celebrations.'],
  ['Radiant Together', 'Celebrating a wonderful new chapter.'],
  ['The Couple', 'A moment of happiness together.'],
  ['New Beginnings', 'A cherished ceremony moment.'],
  ['United in Love', 'A special moment to remember.'],
  ['Just Us', 'A joyful memory from the day.'],
] as const;

// Span classes for each preview tile, in order (5 tiles + 1 explore tile = fills a 4x2 grid)
const tileSpans = [
  'row-span-2',   // img 0 — tall, col 1
  '',             // img 1 — col 2, row 1
  '',             // img 2 — col 3, row 1
  'row-span-2',   // img 3 — tall, col 4
  '',             // img 4 — col 2, row 2
];

export default function Gallery() {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const lightboxStripRef = useRef<HTMLDivElement>(null);

  const galleryImages = couplePhotos.map((photo, index) => {
    const [title, desc] = galleryDetails[index] || ['Captured Moment', 'Akhil & Anjitha'];
    return { id: index + 1, photo, title, desc };
  });

  const PREVIEW_COUNT = 5;
  const previewImages = galleryImages.slice(0, PREVIEW_COUNT);
  const stackPreview = galleryImages.slice(PREVIEW_COUNT, PREVIEW_COUNT + 3);
  const remainingCount = galleryImages.length - PREVIEW_COUNT;

  useEffect(() => {
    if (activeImageIdx === null) return;

    requestAnimationFrame(() => {
      const strip = lightboxStripRef.current;
      if (strip) strip.scrollLeft = strip.clientWidth * activeImageIdx;
    });
  }, [activeImageIdx]);

  return (
    <section id="gallery" className="py-24 bg-maroon-950/40 relative overflow-hidden border-b border-gold-400/10">
      
          {/* Rangoli dot-mandala, left side */}
    <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-64 h-64 opacity-[0.10] pointer-events-none z-0">
      <svg viewBox="0 0 200 200" className="w-full h-full mandala-spin-reverse">
        {[70, 50, 30].map((r, ring) => (
          <g key={ring}>
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx={100 + r * Math.cos((i * 30 * Math.PI) / 180)}
                cy={100 + r * Math.sin((i * 30 * Math.PI) / 180)}
                r={ring === 0 ? 4 : 3}
                fill={ring % 2 === 0 ? '#C97D3D' : '#A64420'}
              />
            ))}
          </g>
        ))}
        <circle cx="100" cy="100" r="10" fill="#7A2E12" />
      </svg>
    </div>

    {/* Paisley spray, right side */}
    <div className="absolute top-10 -right-16 w-64 h-64 opacity-[0.10] pointer-events-none z-0">
      <svg viewBox="0 0 200 200" className="w-full h-full mandala-spin">
        {Array.from({ length: 6 }).map((_, idx) => (
          <path
            key={idx}
            d="M100 40 C130 55 140 85 100 110 C60 85 70 55 100 40 Z"
            fill="#C97D3D"
            transform={`rotate(${idx * 60} 100 100)`}
          />
        ))}
      </svg>
    </div>

    {/* Existing blur blobs stay */}
    <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400/10 rounded-full filter blur-3xl z-0 pointer-events-none" />
    <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold-300/15 rounded-full filter blur-3xl z-0 pointer-events-none" />

    <div className="max-w-6xl mx-auto px-4 relative z-10">
      
    </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <ImageIcon className="w-4 h-4 text-gold-400" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-playfair italic text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-100 to-gold-300 font-bold tracking-wide mb-4"
          >
            Captured Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold-200/80 italic text-sm md:text-base font-cormorant"
          >
            A few treasured moments from our journey together
          </motion.p>
        </div>

        {/* Gallery Grid Container */}
        <div className="rounded-[2rem] border border-gold-400/20 bg-maroon-900/20 p-3 shadow-2xl md:p-4 gold-border-glow">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[135px] sm:auto-rows-[175px] md:auto-rows-[205px] gap-2.5 md:gap-3"
          >
            <AnimatePresence mode="popLayout">
              {previewImages.map((img, idx) => (
                <motion.button
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-gold-400/20 bg-maroon-950/60 text-left shadow-lg hover:border-gold-400/35 transition-all gold-border-glow ${tileSpans[idx] ?? ''}`}
                  onClick={() => setActiveImageIdx(idx)}
                >
                  <img 
                    src={img.photo} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-gold-100 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h4 className="font-playfair italic text-base font-bold tracking-wide text-gold-200">{img.title}</h4>
                    <p className="text-[10px] text-gold-300/80 line-clamp-2 mt-0.5 font-cormorant leading-relaxed">{img.desc}</p>
                  </div>
                </motion.button>
              ))}

              {/* Explore More tile */}
              <motion.button
                key="explore-more"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-gold-400/25 bg-gradient-to-br from-maroon-900/40 via-maroon-900/20 to-maroon-950/50 p-4 text-center shadow-2xl transition-all hover:border-gold-400/40"
                onClick={() => setActiveImageIdx(PREVIEW_COUNT)}
              >
                {/* Photo stack preview */}
                <div className="relative mb-3 h-16 w-full flex items-center justify-center">
                  {stackPreview.map((img, i) => (
                    <img
                      key={img.id}
                      src={img.photo}
                      alt=""
                      className="absolute h-14 w-14 rounded-lg object-cover border border-gold-400/40 shadow-xl transition-transform duration-500 group-hover:scale-105"
                      style={{
                        transform: `rotate(${(i - 1) * 12}deg) translateX(${(i - 1) * 22}px)`,
                        zIndex: i === 1 ? 3 : 1,
                      }}
                    />
                  ))}
                  {remainingCount > 0 && (
                    <span className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-maroon-800 border border-gold-400/30 text-[9px] font-bold text-gold-100 shadow-md font-sans">
                      +{remainingCount}
                    </span>
                  )}
                </div>

                <span className="flex items-center gap-1.5 font-playfair italic text-base font-semibold text-gold-200">
                  Explore More
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold-400" />
                </span>
                <span className="mt-0.5 block text-[10px] text-gold-400/80 font-cormorant tracking-wider uppercase">See full gallery</span>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-maroon-950/98 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveImageIdx(null)}
          >
            {/* Close button */}
            <button
              aria-label="Close gallery"
              className="absolute top-4 right-4 md:top-8 md:right-8 text-gold-300 hover:text-gold-100 bg-maroon-900/60 hover:bg-maroon-900 border border-gold-400/25 p-2.5 rounded-full transition-all z-50 cursor-pointer shadow-lg"
              onClick={() => setActiveImageIdx(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                ref={lightboxStripRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {galleryImages.map((img, idx) => (
                  <figure key={img.id} className="min-w-full snap-center flex flex-col items-center px-1">
                    <img 
                      src={img.photo} 
                      alt={img.title} 
                      className="max-w-full max-h-[65vh] object-contain rounded-lg border border-gold-400/30 shadow-2xl" 
                    />
                    <figcaption className="text-center mt-5 max-w-2xl px-2">
                      <h4 className="font-playfair italic text-xl md:text-2xl font-bold tracking-wide text-gold-200">{img.title}</h4>
                      <p className="text-xs md:text-sm text-gold-100/80 mt-1 font-cormorant leading-relaxed">{img.desc}</p>
                      <div className="text-[9px] text-gold-500 tracking-widest mt-3 uppercase font-cormorant font-bold">
                        {idx + 1} / {galleryImages.length}
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-gold-400/60 font-cormorant font-bold">Swipe or scroll sideways to view next photo</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}