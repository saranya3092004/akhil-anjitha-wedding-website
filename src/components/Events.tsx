import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, ExternalLink, Music, Utensils } from 'lucide-react';

export default function Events() {
  const eventsList = [
    {
      id: "marriage",
      title: "Muhurtham & Wedding Ceremony",
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
    <section id="events" className="py-24 bg-gold-50/50 relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100/30 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-royal-100/20 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-[1px] w-8 bg-gold-400" />
            <Calendar className="w-5 h-5 text-royal-600" />
            <div className="h-[1px] w-8 bg-gold-400" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-royal-800 font-bold tracking-wide mb-4"
          >
            Celebration Schedule
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold-700 italic text-sm md:text-base font-serif"
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
              className="bg-white rounded-3xl border border-gold-200/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Event Header Card */}
              <div className="burgundy-gradient p-6 text-white text-center relative">
                <span className="text-xs text-gold-300 uppercase tracking-widest font-semibold block mb-1">
                  {event.id === 'marriage' ? 'Sacred Ceremony' : 'Grand Dinner'}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide">
                  {event.title}
                </h3>
                <h4 className="font-serif text-gold-200 text-sm md:text-base mt-1 font-light italic">
                  {event.malayalamTitle}
                </h4>
                {/* Visual Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
              </div>

              {/* Event Details Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                
                {/* Event Core Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-0.5">Date</h5>
                      <p className="text-sm md:text-base font-medium text-royal-900">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-0.5">Time</h5>
                      <p className="text-sm md:text-base font-medium text-royal-900">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-0.5">Venue</h5>
                      <p className="text-sm md:text-base font-semibold text-royal-900 mb-0.5">{event.venue}</p>
                      <p className="text-xs text-gold-700 leading-relaxed">{event.address}</p>
                    </div>
                  </div>
                </div>


                {/* Day Schedule / Highlights */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-3 border-b border-gold-200 pb-1">
                    Event Schedule
                  </h4>
                  <ul className="space-y-2.5">
                    {event.highlights.map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-3 text-sm text-gold-900">
                        <span className="text-gold-500 shrink-0 bg-gold-100 p-1 rounded-md">
                          {hl.icon}
                        </span>
                        <span>{hl.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directions Buttons */}
                <div>
                  {event.mapsLink ? (
                    <a
                      href={event.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-xl bg-royal-700 text-white font-medium text-sm shadow-md hover:bg-royal-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-royal-500 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Google Maps
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-gold-300 rounded-xl bg-gold-50/50">
                      <span className="text-xs text-gold-600 font-medium italic text-center">
                        Reception Google Maps directions will be added soon by the couple
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
