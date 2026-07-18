import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ExternalLink, Utensils } from 'lucide-react';

const CornerDecoration = () => (
  <>
    <div className="absolute w-6 h-6 opacity-40 top-2 left-2 pointer-events-none">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M2 46 L2 2 L46 2" stroke="#C97D3D" strokeWidth="2" />
        <circle cx="2" cy="2" r="2" fill="#C97D3D" />
      </svg>
    </div>
    <div className="absolute w-6 h-6 opacity-40 top-2 right-2 pointer-events-none rotate-90">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M2 46 L2 2 L46 2" stroke="#C97D3D" strokeWidth="2" />
        <circle cx="2" cy="2" r="2" fill="#C97D3D" />
      </svg>
    </div>
    <div className="absolute w-6 h-6 opacity-40 bottom-2 left-2 pointer-events-none -rotate-90">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M2 46 L2 2 L46 2" stroke="#C97D3D" strokeWidth="2" />
        <circle cx="2" cy="2" r="2" fill="#C97D3D" />
      </svg>
    </div>
    <div className="absolute w-6 h-6 opacity-40 bottom-2 right-2 pointer-events-none rotate-180">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M2 46 L2 2 L46 2" stroke="#C97D3D" strokeWidth="2" />
        <circle cx="2" cy="2" r="2" fill="#C97D3D" />
      </svg>
    </div>
  </>
);

export default function Events() {
  const eventsList = [
    {
      id: "marriage",
      title: "Muhurtham & Ceremony",
      date: "Sunday, September 13, 2026",
      time: "10:30 AM - 11:30 AM (IST)",
      venue: "Aswathy kalyana mandapam",
      address: "Vadakkanthara Rd, Police Quarters, Vadakkanthara, Palakkad, Kerala 678012",
      mapsLink: "https://maps.app.goo.gl/3794ChUF8DFWbfJGA?g_st=aw",
      highlights: [
        { icon: <Clock className="w-4 h-4" />, text: "10:30 AM - Baraat / Welcoming of Groom" },
        { icon: <Clock className="w-4 h-4" />, text: "11:30 AM - Muhurtham (Tying of Thali)" },
        { icon: <Utensils className="w-4 h-4" />, text: "11:30 AM onwards - Traditional Kerala Sadhya" }
      ],
    },
    {
      id: "reception",
      title: "The Wedding Reception",
      date: "Sunday, September 13, 2026",
      time: "5:00 PM Onwards",
      venue: "Krishna Shri Kalyana Mandapam",
      address: "Para, Vengodi, Elappully, Kerala 678622",
      mapsLink: "https://maps.app.goo.gl/8DkTZYAHXBfWWLyQ8?g_st=aw", 
      highlights: [
        { icon: <Clock className="w-4 h-4" />, text: "05:00 PM - Stage Ceremony & Welcome" },
        { icon: <Utensils className="w-4 h-4" />, text: "06:00 PM onwards - Dinner" }
      ],
    }
  ];

  return (
    <section id="events" className="py-24 bg-maroon-950 relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-maroon-900/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon-900/10 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <Calendar className="w-4 h-4 text-gold-400" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-playfair italic text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-100 to-gold-300 font-bold tracking-wide mb-4"
          >
            Celebration Schedule
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold-200/80 italic text-sm md:text-base font-cormorant"
          >
            Please join us for all the festivities on our special days
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {eventsList.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-maroon-900/35 backdrop-blur-md rounded-3xl border border-gold-400/20 shadow-2xl overflow-hidden flex flex-col h-full hover:border-gold-400/35 transition-all duration-300 relative gold-border-glow"
            >
              {/* Event Header Card */}
              <div className="p-6 text-center relative border-b border-gold-400/10 bg-maroon-950/40">
                <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold block mb-1.5 font-cormorant">
                  {event.id === 'marriage' ? 'Sacred Ceremony' : 'Grand Celebrations'}
                </span>
                <h3 className="font-playfair italic text-2xl md:text-3xl font-bold tracking-wide text-gold-200">
                  {event.title}
                </h3>
                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C 50%, transparent)' }} />
              </div>

              {/* Event Details Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative bg-maroon-950/10">
                
                {/* Corner Decoration Ornaments */}
                <CornerDecoration />

                {/* Event Core Info */}
                <div className="space-y-4 mb-6 relative z-10">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-gold-400/70 font-bold mb-0.5 font-cormorant">Date</h5>
                      <p className="text-sm md:text-base font-medium text-gold-100 font-cormorant">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-gold-400/70 font-bold mb-0.5 font-cormorant">Time</h5>
                      <p className="text-sm md:text-base font-medium text-gold-100 font-cormorant">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-1" />
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-gold-400/70 font-bold mb-0.5 font-cormorant">Venue</h5>
                      <p className="text-sm md:text-base font-semibold text-gold-200 mb-0.5 font-cormorant">{event.venue}</p>
                      <p className="text-xs text-gold-300/80 leading-relaxed font-cormorant">{event.address}</p>
                    </div>
                  </div>
                </div>

                {/* Day Schedule / Highlights */}
                <div className="mb-8 relative z-10">
                  <h4 className="text-[10px] uppercase tracking-widest text-gold-400/70 font-bold mb-3 border-b border-gold-400/10 pb-1 font-cormorant">
                    Schedule Details
                  </h4>
                  <ul className="space-y-2.5">
                    {event.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-3 text-sm text-gold-200 font-cormorant">
                        <span className="text-gold-400 shrink-0 bg-maroon-900/60 p-1.5 rounded-md border border-gold-400/15">
                          {hl.icon}
                        </span>
                        <span>{hl.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directions Buttons */}
                <div className="relative z-10">
                  {event.mapsLink ? (
                    <a
                      href={event.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold-400/30 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-gold-300 hover:text-gold-100 font-medium text-xs md:text-sm tracking-wider uppercase transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 cursor-pointer font-cormorant shadow-md"
                    >
                      <MapPin className="w-4 h-4 text-gold-400 animate-pulse" />
                      View on Google Maps
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center p-3 border border-dashed border-gold-400/30 rounded-xl bg-maroon-950/20">
                      <span className="text-xs text-gold-400 font-medium italic text-center font-cormorant">
                        Google Maps directions will be added soon
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
