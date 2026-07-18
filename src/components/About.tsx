import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { bridePhoto, groomPhoto } from '../weddingPhotos';

export default function About() {
  return (
    <section id="story" className="py-24 bg-white relative overflow-hidden mandap-pattern">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-[1px] w-8 bg-gold-400" />
            <Heart className="w-5 h-5 text-royal-600 fill-royal-600/10" />
            <div className="h-[1px] w-8 bg-gold-400" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-royal-800 font-bold tracking-wide mb-4"
          >
            Our Story
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold-700 italic text-sm md:text-base font-serif"
          >
            "Two hearts, one soul, beginning a beautiful journey together forever."
          </motion.p>
        </div>

        {/* Groom & Bride Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          
          {/* Groom Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gold-50/50 rounded-2xl p-6 md:p-8 border border-gold-200/40 shadow-sm relative group hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4 text-gold-300 font-serif italic text-6xl opacity-25 select-none font-bold">He</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold-300 shadow-inner mb-6 relative">
                <img 
                  src={groomPhoto}
                  alt="Akhil M"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-royal-800 mb-1">Akhil M</h3>
              <p className="text-xs uppercase tracking-widest text-gold-600 font-medium mb-4">The Groom</p>
              <p className="text-sm text-gold-800 leading-relaxed max-w-sm">
                Known for his calm demeanor, kind heart, and infectious optimism. Akhil is a dedicated professional who cherishes family values, deep conversations, and has a strong passion for making every moment count.
              </p>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gold-50/50 rounded-2xl p-6 md:p-8 border border-gold-200/40 shadow-sm relative group hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4 text-gold-300 font-serif italic text-6xl opacity-25 select-none font-bold">She</div>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gold-300 shadow-inner mb-6 relative">
                <img 
                  src={bridePhoto}
                  alt="Anjitha R"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-royal-800 mb-1">Anjitha R</h3>
              <p className="text-xs uppercase tracking-widest text-gold-600 font-medium mb-4">The Bride</p>
              <p className="text-sm text-gold-800 leading-relaxed max-w-sm">
                Vibrant, graceful, and full of life. Anjitha brings light and joy to everyone she meets. She has a deep appreciation for art, traditional values, and loves finding beauty in the little details of life.
              </p>
            </div>
          </motion.div>

        </div>

        {/* The Journey Timeline */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl text-royal-800 text-center font-bold tracking-wide mb-10">How We Met</h3>
          
          <div className="relative border-l border-gold-300/40 ml-4 md:ml-32">
            {[
              {
                title: "The First Meeting",
                date: "March 2024",
                desc: "An introduction facilitated by family soon turned into hours of endless conversation. They discovered a shared worldview, common interests, and an immediate, comfortable connection."
              },
              {
                title: "Growing Closer",
                date: "July 2024",
                desc: "Through video calls, messages, and unforgettable shared laughter, they became each other's best friends, confidants, and constant support systems."
              },
              {
                title: "The Engagement",
                date: "January 2025",
                desc: "With the full, joyous blessings of both families, Akhil and Anjitha exchanged rings, officially taking their first step toward building a lifetime together."
              }
            ].map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="mb-10 ml-6 relative"
              >
                {/* Bullet */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-gold-400 border-4 border-white shadow-sm" />
                
                {/* Date Side Label (Desktop-only helper) */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24 text-sm font-semibold text-royal-700">
                  {step.date}
                </div>
                
                <div className="bg-gold-50/30 p-5 rounded-xl border border-gold-200/20 shadow-xs">
                  <span className="block md:hidden text-xs font-semibold text-royal-700 mb-1">{step.date}</span>
                  <h4 className="font-serif text-lg font-semibold text-royal-800 mb-2">{step.title}</h4>
                  <p className="text-sm text-gold-800 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
