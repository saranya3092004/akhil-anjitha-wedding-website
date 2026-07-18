import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, CheckCircle2, User, HelpCircle, HeartHandshake } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Wish } from '../types';

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const relationOptions = [
    { value: 'Groom\'s Friend', label: 'Groom\'s Friend' },
    { value: 'Bride\'s Friend', label: 'Bride\'s Friend' },
    { value: 'Groom\'s Family', label: 'Groom\'s Family' },
    { value: 'Bride\'s Family', label: 'Bride\'s Family' },
    { value: 'Well Wisher', label: 'Well Wisher' }
  ];

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name,
          relation: d.relation,
          message: d.message,
          createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : new Date().toISOString()
        } as Wish;
      });
      setWishes(data);
      setLoading(false);
    }, (err) => {
      console.error('Error listening to wishes:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !relation || !message.trim()) {
      setError('Please fill in all the fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'wishes'), {
        name: name.trim(),
        relation,
        message: message.trim(),
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setName('');
      setRelation('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError('Could not post your wish. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 bg-maroon-950 relative overflow-hidden border-b border-gold-400/10">
      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <MessageSquare className="w-4 h-4 text-gold-400 animate-pulse" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </div>
          <h2 className="font-playfair italic text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-100 to-gold-300 font-bold tracking-wide mb-4">
            Digital Guestbook
          </h2>
          <p className="text-gold-200/80 italic text-sm md:text-base font-cormorant">
            Leave your warm wishes and blessings for the bride & groom to read instantly!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">

          {/* Guestbook Form Card */}
          <div className="lg:col-span-2 bg-maroon-900/35 backdrop-blur-md rounded-3xl border border-gold-400/20 p-6 md:p-8 shadow-2xl gold-border-glow">
            <h3 className="font-playfair italic text-xl font-bold text-gold-200 mb-6 flex items-center gap-2">
              <HeartHandshake className="w-4.5 h-4.5 text-gold-400" />
              Bless the Couple
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-2 font-cormorant">
                  Your Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gold-500/60">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-maroon-950/60 rounded-xl border border-gold-400/20 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/10 text-sm outline-none transition-all placeholder:text-gold-400/30 text-gold-100 font-cormorant font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-2 font-cormorant">
                  Your Relation to Couple
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gold-500/60">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <select
                    required
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-maroon-950/60 rounded-xl border border-gold-400/20 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/10 text-sm outline-none transition-all text-gold-100 appearance-none cursor-pointer font-cormorant font-bold"
                  >
                    <option value="" disabled className="bg-maroon-950 text-gold-400/50">Select relation...</option>
                    {relationOptions.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-maroon-950 text-gold-100">{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-2 font-cormorant">
                  Your Wishes & Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your beautiful blessings..."
                  className="w-full px-4 py-3 bg-maroon-950/60 rounded-xl border border-gold-400/20 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/10 text-sm outline-none transition-all placeholder:text-gold-400/30 text-gold-100 resize-none leading-relaxed font-cormorant leading-relaxed font-bold"
                />
              </div>

              {error && (
                <div className="text-xs text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-900/30 font-cormorant">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold-400/30 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-gold-300 hover:text-gold-100 font-medium text-xs md:text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-cormorant font-bold"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gold-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Blessings...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-400" />
                    Publish Wish instantly
                  </>
                )}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-sm text-green-200 bg-green-950/40 p-4 rounded-xl border border-green-900/30 shadow-md font-cormorant leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span>Your warm wish was successfully published! Thank you!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Wishes Feed */}
          <div className="lg:col-span-3 flex flex-col h-[520px]">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gold-400/20">
              <h3 className="font-playfair italic text-lg font-bold text-gold-200 tracking-wide">
                Wishes from Loved Ones ({wishes.length})
              </h3>
              <div className="text-xs text-gold-400 bg-maroon-900/60 border border-gold-400/20 px-2.5 py-1 rounded-full font-medium font-cormorant font-bold">
                Live Feed
              </div>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <svg className="animate-spin h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs text-gold-400 font-medium mt-3 font-cormorant">Loading blessings...</span>
              </div>
            ) : wishes.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-6 border border-dashed border-gold-400/20 rounded-2xl bg-maroon-900/10">
                <MessageSquare className="w-8 h-8 text-gold-400/30 mb-2" />
                <h4 className="text-sm font-semibold text-gold-300 font-cormorant">No wishes published yet</h4>
                <p className="text-xs text-gold-400/60 mt-1 font-cormorant">Be the very first one to write a message and bless the couple!</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-track-maroon-950 scrollbar-thumb-gold-500/20 no-scrollbar">
                <AnimatePresence initial={false}>
                  {wishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-maroon-900/30 backdrop-blur-md p-5 rounded-2xl border border-gold-400/20 shadow-xl hover:border-gold-400/35 transition-all gold-border-glow"
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-playfair italic font-bold text-gold-200 text-base leading-tight">
                            {wish.name}
                          </h4>
                          <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-gold-400 mt-1.5 px-2 py-0.5 bg-maroon-950/60 border border-gold-400/20 rounded font-cormorant">
                            {wish.relation}
                          </span>
                        </div>
                        <span className="text-[9px] text-gold-400/60 font-medium font-cormorant whitespace-nowrap">
                          {new Date(wish.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gold-100/90 leading-relaxed font-cormorant italic border-l-2 border-gold-400/70 pl-3.5 mt-2.5">
                        "{wish.message}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}