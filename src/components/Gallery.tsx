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
    const [title, desc] = galleryDetails[index];
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
    <section id="gallery" className="py-24 bg-white relative overflow-hidden mandap-pattern">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-[1px] w-8 bg-gold-400" />
            <ImageIcon className="w-5 h-5 text-royal-600" />
            <div className="h-[1px] w-8 bg-gold-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-royal-800 font-bold tracking-wide mb-4"
          >
            Captured Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold-700 italic text-sm md:text-base font-serif"
          >
            A few treasured moments from our journey together
          </motion.p>
        </div>

        <div className="rounded-[2rem] border border-gold-200/70 bg-royal-900 p-2.5 shadow-xl shadow-royal-900/20 md:p-3">
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
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-gold-200/30 bg-gold-50 text-left shadow-sm hover:shadow-lg transition-all ${tileSpans[idx] ?? ''}`}
                  onClick={() => setActiveImageIdx(idx)}
                >
                  <img src={img.photo} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 via-royal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h4 className="font-serif text-lg font-bold tracking-wide text-gold-300">{img.title}</h4>
                    <p className="text-xs text-gold-100 line-clamp-2 mt-1 font-light font-sans">{img.desc}</p>
                  </div>
                </motion.button>
              ))}

              {/* Explore More tile — shows a stacked peek of upcoming photos */}
              <motion.button
                key="explore-more"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-gold-200 via-gold-100 to-gold-50 p-4 text-center shadow-inner transition-all hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => setActiveImageIdx(PREVIEW_COUNT)}
              >
                {/* Photo stack */}
                <div className="relative mb-3 h-16 w-full flex items-center justify-center">
                  {stackPreview.map((img, i) => (
                    <img
                      key={img.id}
                      src={img.photo}
                      alt=""
                      className="absolute h-14 w-14 rounded-lg object-cover border-2 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
                      style={{
                        transform: `rotate(${(i - 1) * 12}deg) translateX(${(i - 1) * 22}px)`,
                        zIndex: i === 1 ? 3 : 1,
                      }}
                    />
                  ))}
                  {remainingCount > 0 && (
                    <span className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-royal-700 text-[10px] font-bold text-gold-100 shadow-md">
                      +{remainingCount}
                    </span>
                  )}
                </div>

                <span className="flex items-center gap-1.5 font-serif text-base font-semibold text-royal-800 sm:text-lg">
                  Explore More
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-0.5 block text-[11px] text-gold-800">See the rest of our story</span>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveImageIdx(null)}
          >
            <button
              aria-label="Close gallery"
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gold-300 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50 cursor-pointer"
              onClick={() => setActiveImageIdx(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                ref={lightboxStripRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {galleryImages.map((img, idx) => (
                  <figure key={img.id} className="min-w-full snap-center flex flex-col items-center px-1">
                    <img src={img.photo} alt={img.title} className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl" />
                    <figcaption className="text-center mt-5 max-w-2xl text-white px-2">
                      <h4 className="font-serif text-xl md:text-2xl font-bold tracking-wide text-gold-300">{img.title}</h4>
                      <p className="text-xs md:text-sm text-gray-300 mt-1 font-sans font-light">{img.desc}</p>
                      <div className="text-[10px] text-gold-500 tracking-widest mt-3 uppercase">{idx + 1} / {galleryImages.length}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-5 text-center text-xs uppercase tracking-[0.2em] text-gold-300/80">Swipe or scroll sideways to see the next photo</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}