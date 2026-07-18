import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, Lock, ChevronRight, RefreshCw, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import {
  collection, onSnapshot, query, orderBy, deleteDoc, doc, Timestamp
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth';
import { db, auth } from '../firebase';
import { RSVP, Wish } from '../types';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [activeTab, setActiveTab] = useState<'rsvps' | 'wishes'>('rsvps');

  // Firebase remembers the session across refreshes automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Live RSVP + wishes data, only fetched once authenticated
  useEffect(() => {
    if (!authenticated) return;

    const rsvpQuery = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
    const unsubRsvps = onSnapshot(rsvpQuery, (snap) => {
      setRsvps(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate().toISOString() : new Date().toISOString()
        } as RSVP;
      }));
    });

    const wishQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsubWishes = onSnapshot(wishQuery, (snap) => {
      setWishes(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString()
        } as Wish;
      }));
    });

    return () => { unsubRsvps(); unsubWishes(); };
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setLoggingIn(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged above will flip `authenticated` to true
    } catch (err: any) {
      setError('Incorrect email or password.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleDeleteRSVP = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this RSVP record?')) return;
    try {
      await deleteDoc(doc(db, 'rsvps', id));
    } catch {
      alert('Failed to delete RSVP.');
    }
  };

  const handleDeleteWish = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete/moderate this Guestbook Wish?')) return;
    try {
      await deleteDoc(doc(db, 'wishes', id));
    } catch {
      alert('Failed to delete wish.');
    }
  };

  // ---- Statistics (unchanged from your original) ----
  const totalRSVPs = rsvps.length;
  const attendingRSVPs = rsvps.filter(r => r.attending === 'yes');
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;
  const totalGuestsCount = attendingRSVPs.reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const vegGuestsCount = attendingRSVPs.filter(r => r.foodPreference === 'veg').reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const nonVegGuestsCount = totalGuestsCount - vegGuestsCount;
  const attendingMarriageCount = attendingRSVPs.filter(r => r.events.includes('marriage')).reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const attendingReceptionCount = attendingRSVPs.filter(r => r.events.includes('reception')).reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);

  if (checkingAuth) {
    return (
      <section id="admin" className="py-24 bg-gold-50 min-h-screen flex items-center justify-center">
        <span className="text-gold-600 text-sm">Checking session...</span>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 bg-gold-50 relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-gold-400" />
            <ClipboardCheck className="w-5 h-5 text-royal-600 animate-bounce" />
            <div className="h-[1px] w-8 bg-gold-400" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-royal-800 font-bold tracking-wide mb-4">
            RSVP & Wish Dashboard
          </h2>
          <p className="text-gold-700 italic text-sm md:text-base font-serif">
            Secure admin page for Akhil & Anjitha to monitor RSVP counts and guestbook wishes
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!authenticated ? (
            <motion.div
              key="login-box"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto bg-white rounded-3xl border border-gold-200 shadow-xl p-8 text-center"
            >
              <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-royal-900 mb-2">Admin Sign In</h3>
              <p className="text-xs text-gold-600 leading-relaxed mb-6">
                To respect guest privacy, RSVP names, emails, and phone numbers are protected. Please sign in with your admin account.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full text-center px-4 py-3 bg-gold-50 rounded-xl border border-gold-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/10 text-sm outline-none transition-all placeholder:text-gold-400"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-center px-4 py-3 bg-gold-50 rounded-xl border border-gold-200 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/10 text-sm outline-none transition-all placeholder:text-gold-400"
                />

                {error && (
                  <div className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-royal-700 hover:bg-royal-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {loggingIn ? 'Signing in...' : 'Unlock Dashboard'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gold-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-gold-800 font-medium">Secured Connection — Logged in as Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-semibold text-red-700 transition-colors cursor-pointer"
                >
                  Lock Board
                </button>
              </div>

              {/* Stat cards, charts, tables: identical to your original — omitted here for brevity, paste back unchanged */}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}