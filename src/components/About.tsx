import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { bridePhoto, groomPhoto } from '../weddingPhotos';

export default function About() {
  return (
    <section id="story" className="py-24 relative overflow-hidden bg-maroon-900/60 border-t border-b border-gold-400/15">

      {/* Background depth: warm blurred blooms + faint botanical mandala */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-400/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-300/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 opacity-[0.05] pointer-events-none -translate-x-1/2">
        <svg viewBox="0 0 400 400" className="w-full h-full mandala-spin">
          {Array.from({ length: 12 }).map((_, idx) => (
            <ellipse key={idx} cx="200" cy="100" rx="15" ry="50" fill="#C97D3D" transform={`rotate(${idx * 30} 200 200)`} />
          ))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <Heart className="w-4 h-4 text-gold-400 fill-gold-400/10" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="font-playfair italic text-4xl md:text-5xl gold-gradient-text font-bold tracking-wide mb-4">
            Our Story
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gold-200 italic text-sm md:text-base font-cormorant">
            "Two hearts, one soul, beginning a beautiful journey together forever."
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold-400/25 shadow-xl relative group hover:border-gold-400/45 transition-all gold-border-glow">
            <div className="absolute top-4 right-4 text-gold-400 font-playfair italic text-6xl opacity-10 select-none font-bold">He</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold-400/60 shadow-xl mb-6 relative group-hover:border-gold-400 transition-all">
                <img src={groomPhoto} alt="Akhil M" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-playfair italic text-2xl md:text-3xl font-semibold text-gold-200 mb-1">Akhil M</h3>
              <p className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-4 font-cormorant">The Groom</p>
              <p className="text-sm text-maroon-800 font-cormorant leading-relaxed max-w-sm">
                Known for his calm demeanor, kind heart, and infectious optimism. Akhil is a dedicated professional who cherishes family values, deep conversations, and has a strong passion for making every moment count.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gold-400/25 shadow-xl relative group hover:border-gold-400/45 transition-all gold-border-glow">
            <div className="absolute top-4 right-4 text-gold-400 font-playfair italic text-6xl opacity-10 select-none font-bold">She</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold-400/60 shadow-xl mb-6 relative group-hover:border-gold-400 transition-all">
                <img src={bridePhoto} alt="Anjitha R" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-playfair italic text-2xl md:text-3xl font-semibold text-gold-200 mb-1">Anjitha R</h3>
              <p className="text-[10px] uppercase tracking-widest text-gold-500 font-bold mb-4 font-cormorant">The Bride</p>
              <p className="text-sm text-maroon-800 font-cormorant leading-relaxed max-w-sm">
                Vibrant, graceful, and full of life. Anjitha brings light and joy to everyone she meets. She has a deep appreciation for art, traditional values, and loves finding beauty in the little details of life.
              </p>
            </div>
          </motion.div>

        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="font-playfair italic text-2xl md:text-3xl text-gold-800 text-center font-bold tracking-wide mb-10">How We Met</h3>

          <div className="relative border-l border-gold-400/30 ml-4 md:ml-32">
            {[
              { title: "The First Meeting", date: "March 2024", desc: "An introduction facilitated by family soon turned into hours of endless conversation. They discovered a shared worldview, common interests, and an immediate, comfortable connection." },
              { title: "Growing Closer", date: "July 2024", desc: "Through video calls, messages, and unforgettable shared laughter, they became each other's best friends, confidants, and constant support systems." },
              { title: "The Engagement", date: "January 2025", desc: "With the full, joyous blessings of both families, Akhil and Anjitha exchanged rings, officially taking their first step toward building a lifetime together." }
            ].map((step, idx) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.15 }} className="mb-10 ml-6 relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-gold-400 border-4 border-maroon-900 shadow-md" />
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24 text-sm font-bold text-gold-600 font-cormorant tracking-wider">
                  {step.date}
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-gold-400/20 shadow-md gold-border-glow">
                  <span className="block md:hidden text-xs font-bold text-gold-600 mb-1.5 font-cormorant uppercase tracking-widest">{step.date}</span>
                  <h4 className="font-playfair italic text-lg font-semibold text-gold-800 mb-2">{step.title}</h4>
                  <p className="text-sm text-maroon-800 font-cormorant leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}