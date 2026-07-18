import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Check, Phone, Users, CalendarCheck2, ArrowRight } from 'lucide-react';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['marriage', 'reception']);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleEventToggle = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(e => e !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (attending === 'yes' && selectedEvents.length === 0) {
      setError('Please select at least one event you are attending.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'rsvps'), {
        name: name.trim(),
        phone: phone.trim(),
        attending,
        guestsCount: attending === 'yes' ? guestsCount : 0,
        events: attending === 'yes' ? selectedEvents : [],
        message: message.trim(),
        submittedAt: serverTimestamp()
      });

      setSuccess(true);
      setName('');
      setPhone('');
      setGuestsCount(1);
      setSelectedEvents(['marriage', 'reception']);
      setMessage('');
    } catch (err: any) {
      console.error('RSVP submit error:', err);
      setError('Could not submit your RSVP. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 bg-maroon-950 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-10 -left-10 w-64 h-64 bg-gold-400/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-10 -right-10 w-72 h-72 bg-gold-300/15 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <CalendarCheck2 className="w-4 h-4 text-gold-400" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </div>

          <h2 className="font-playfair italic text-4xl md:text-5xl gold-gradient-text font-bold tracking-wide mb-4">
            Join Our Celebrations
          </h2>
          <p className="text-gold-200 italic text-sm md:text-base font-cormorant">
            Kindly RSVP by August 30, 2026 to help us make necessary arrangements.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-gold-400/25 shadow-xl overflow-hidden grid md:grid-cols-12 max-w-3xl mx-auto gold-border-glow">

<div
  className="md:col-span-4 p-8 text-white flex flex-col justify-between relative"
  style={{
    background: "linear-gradient(160deg, #6d372e 0%, #A94E44 100%)",
  }}
>
  <div className="space-y-4">
    <span className="text-gold-100 uppercase tracking-widest text-xs font-semibold block font-cormorant">
      Response Card
    </span>

    <h3 className="font-playfair italic text-3xl font-bold leading-tight">
      Akhil &amp; Anjitha
    </h3>

<p className="text-xs text-[#FFF8E7] leading-relaxed font-cormorant font-light">      Please respond on or before August 30, 2026. We are incredibly eager to
      celebrate these precious moments alongside you!
    </p>
  </div>
</div>

          <div className="md:col-span-8 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="rsvp-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Please enter your full name"
                      className="w-full px-4 py-2.5 bg-gold-50 rounded-xl border border-gold-300/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 text-sm outline-none transition-all placeholder:text-maroon-700/40 text-maroon-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold-500">
                        <Phone className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-9 pr-4 py-2.5 bg-gold-50 rounded-xl border border-gold-300/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 text-sm outline-none transition-all placeholder:text-maroon-700/40 text-maroon-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                      Will You Attend? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending('yes')}
                        className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          attending === 'yes'
                            ? 'bg-gold-500 border-gold-500 text-white shadow-sm'
                            : 'bg-gold-50 border-gold-300/60 text-maroon-800 hover:bg-gold-100'
                        }`}
                      >
                        {attending === 'yes' && <Check className="w-4 h-4" />}
                        Yes, I will be there!
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending('no')}
                        className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          attending === 'no'
                            ? 'bg-gold-500 border-gold-500 text-white shadow-sm'
                            : 'bg-gold-50 border-gold-300/60 text-maroon-800 hover:bg-gold-100'
                        }`}
                      >
                        {attending === 'no' && <Check className="w-4 h-4" />}
                        Regretfully, No
                      </button>
                    </div>
                  </div>

                  {attending === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-5 pt-2 border-t border-gold-200"
                    >
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                          Number of Attending Guests
                        </label>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-gold-500" />
                          <div className="flex gap-1.5 flex-1 overflow-x-auto py-1">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setGuestsCount(num)}
                                className={`w-10 h-10 rounded-lg text-xs font-bold border transition-all shrink-0 cursor-pointer ${
                                  guestsCount === num
                                    ? 'bg-gold-400 border-gold-400 text-white'
                                    : 'bg-gold-50 border-gold-300/50 text-maroon-800 hover:bg-gold-100'
                                }`}
                              >
                                {num === 6 ? '6+' : num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                          Events Attending *
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: 'marriage', label: 'Marriage (Sep 13, 2026 - Vadakkanthara)' },
                            { id: 'reception', label: 'Wedding Reception (Sep 13, 2026 - Para Elapully)' }
                          ].map(ev => (
                            <button
                              key={ev.id}
                              type="button"
                              onClick={() => handleEventToggle(ev.id)}
                              className={`w-full text-left py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                                selectedEvents.includes(ev.id)
                                  ? 'bg-gold-50 border-gold-400 text-maroon-800 font-semibold'
                                  : 'bg-white border-gold-200 text-maroon-700/60 hover:bg-gold-50/50'
                              }`}
                            >
                              <span>{ev.label}</span>
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                selectedEvents.includes(ev.id)
                                  ? 'bg-gold-400 border-gold-400 text-white'
                                  : 'border-gold-300'
                              }`}>
                                {selectedEvents.includes(ev.id) && <Check className="w-3 h-3" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gold-600 mb-2 font-cormorant">
                      Message for the Couple (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write any special requests or congrats messages..."
                      className="w-full px-4 py-2.5 bg-gold-50 rounded-xl border border-gold-300/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 text-sm outline-none transition-all placeholder:text-maroon-700/40 text-maroon-800 resize-none leading-relaxed"
                    />
                  </div>

                  {error && (
                    <div className="text-xs text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending RSVP...
                      </>
                    ) : (
                      <>
                        Submit RSVP Response
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center px-4"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-md mb-6">
                    <Check className="w-8 h-8 text-emerald-500 stroke-[3]" />
                  </div>
                  <h3 className="font-playfair italic text-3xl font-bold text-gold-800 mb-3">
                    Thank You So Much!
                  </h3>
                  <p className="text-sm text-maroon-800 max-w-sm leading-relaxed mb-8 font-cormorant">
                    Your RSVP attendance response has been securely saved. The bride and groom have been instantly notified!
                  </p>
                  <div className="flex justify-center w-full max-w-xs">
                    <button
                      onClick={() => setSuccess(false)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border border-gold-300 rounded-xl text-maroon-800 text-xs font-semibold hover:bg-gold-50 bg-white shadow-xs transition-colors cursor-pointer"
                    >
                      Change Response
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}