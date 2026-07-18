import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, Lock, ChevronRight, RefreshCw, Trash2, AlertCircle } from 'lucide-react';
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
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');
  const [activeTab, setActiveTab] = useState<'rsvps' | 'wishes'>('rsvps');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setDataLoading(true);
    setDataError('');

    const rsvpQuery = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
    const unsubRsvps = onSnapshot(
      rsvpQuery,
      (snap) => {
        setRsvps(snap.docs.map(d => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate().toISOString() : new Date().toISOString()
          } as RSVP;
        }));
        setDataLoading(false);
      },
      (err) => {
        console.error('RSVP listener error:', err);
        setDataError(`Could not load RSVPs: ${err.message}`);
        setDataLoading(false);
      }
    );

    const wishQuery = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsubWishes = onSnapshot(
      wishQuery,
      (snap) => {
        setWishes(snap.docs.map(d => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString()
          } as Wish;
        }));
      },
      (err) => {
        console.error('Wishes listener error:', err);
        setDataError(`Could not load wishes: ${err.message}`);
      }
    );

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

  const totalRSVPs = rsvps.length;
  const attendingRSVPs = rsvps.filter(r => r.attending === 'yes');
  const declinedCount = rsvps.filter(r => r.attending === 'no').length;
  const totalGuestsCount = attendingRSVPs.reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const attendingMarriageCount = attendingRSVPs.filter(r => r.events.includes('marriage')).reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const attendingReceptionCount = attendingRSVPs.filter(r => r.events.includes('reception')).reduce((acc, curr) => acc + (curr.guestsCount || 1), 0);
  const responseRate = totalRSVPs > 0 ? Math.round((attendingRSVPs.length / totalRSVPs) * 100) : 0;

  if (checkingAuth) {
    return (
      <section id="admin" className="py-24 bg-maroon-950 min-h-screen flex items-center justify-center">
        <span className="text-maroon-800 text-sm font-cormorant">Checking session...</span>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 bg-maroon-950 relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-gold-400/40" />
            <ClipboardCheck className="w-4 h-4 text-gold-400" />
            <div className="h-[1px] w-8 bg-gold-400/40" />
          </div>
          <h2 className="font-playfair italic text-4xl md:text-5xl gold-gradient-text font-bold tracking-wide mb-4">
            RSVP & Wish Dashboard
          </h2>
          <p className="text-gold-200 italic text-sm md:text-base font-cormorant">
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
              className="max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-3xl border border-gold-400/25 shadow-xl p-8 text-center gold-border-glow"
            >
              <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="font-playfair italic text-xl font-bold text-gold-800 mb-2">Admin Sign In</h3>
              <p className="text-xs text-maroon-800 leading-relaxed mb-6 font-cormorant">
                To respect guest privacy, RSVP names and phone numbers are protected. Please sign in with your admin account.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full text-center px-4 py-3 bg-gold-50 rounded-xl border border-gold-300/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 text-sm outline-none transition-all placeholder:text-maroon-700/40 text-maroon-800"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-center px-4 py-3 bg-gold-50 rounded-xl border border-gold-300/50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 text-sm outline-none transition-all placeholder:text-maroon-700/40 text-maroon-800"
                />

                {error && (
                  <div className="text-xs text-red-700 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
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
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-gold-400/25 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-maroon-800 font-medium font-cormorant">Secured Connection — Logged in as Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-semibold text-red-700 transition-colors cursor-pointer"
                >
                  Lock Board
                </button>
              </div>

              {dataError && (
                <div className="text-xs text-red-700 font-medium bg-red-50 p-3 rounded-lg border border-red-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{dataError} — check that your Firestore Security Rules are published and this email is signed in as the intended admin user.</span>
                </div>
              )}

              {dataLoading ? (
                <div className="text-center text-maroon-800 text-sm font-cormorant py-10">Loading data...</div>
              ) : (
                <>
                  {/* Stat cards — 3 across now, no food-based cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: "Total RSVPs", val: totalRSVPs, desc: `${attendingRSVPs.length} Yes / ${declinedCount} No` },
                      { title: "Total Guests Attending", val: totalGuestsCount, desc: "Sum of all party sizes" },
                      { title: "Response Rate", val: `${responseRate}%`, desc: "Of all RSVPs, confirmed attending" }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-5 bg-white/70 backdrop-blur-md rounded-2xl border-l-4 border-gold-400 shadow-sm">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-gold-600 mb-1 font-cormorant">{stat.title}</h4>
                        <div className="font-playfair italic text-3xl font-bold text-maroon-800 leading-tight">{stat.val}</div>
                        <p className="text-[10px] text-maroon-700 font-medium mt-1 leading-relaxed font-cormorant">{stat.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Charts — Event demand bars + Response overview donut, replacing the old catering chart */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gold-400/25 shadow-sm">
                      <h3 className="font-playfair italic text-lg font-bold text-gold-800 mb-6 border-b border-gold-200 pb-2">
                        Event Guest Demands
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-xs font-medium text-maroon-800 mb-1.5 font-cormorant">
                            <span>Marriage Ceremony</span>
                            <span className="font-bold">{attendingMarriageCount} Guests</span>
                          </div>
                          <div className="w-full h-3 bg-gold-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${totalGuestsCount > 0 ? (attendingMarriageCount / totalGuestsCount) * 100 : 0}%`, background: 'linear-gradient(90deg, #A64420, #C97D3D)' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs font-medium text-maroon-800 mb-1.5 font-cormorant">
                            <span>Wedding Reception</span>
                            <span className="font-bold">{attendingReceptionCount} Guests</span>
                          </div>
                          <div className="w-full h-3 bg-gold-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" style={{ width: `${totalGuestsCount > 0 ? (attendingReceptionCount / totalGuestsCount) * 100 : 0}%` }} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-gold-600 italic mt-6 leading-relaxed font-cormorant">
                        * Percentages reflect relative ratios based on total attending guests ({totalGuestsCount}).
                      </p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-gold-400/25 shadow-sm flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair italic text-lg font-bold text-gold-800 mb-4 border-b border-gold-200 pb-2">
                          Response Overview
                        </h3>
                        <p className="text-xs text-maroon-700 leading-relaxed mb-4 font-cormorant">
                          Breakdown of confirmed vs. declined RSVPs received so far.
                        </p>
                      </div>
                      <div className="flex items-center gap-8 py-2">
                        <div className="relative w-28 h-28 shrink-0">
                          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F0D3A8" strokeWidth="4" />
                            {totalRSVPs > 0 && (
                              <circle
                                cx="18" cy="18" r="15.915" fill="none"
                                stroke="#10b981" strokeWidth="4.2"
                                strokeDasharray={`${(attendingRSVPs.length / totalRSVPs) * 100} ${100 - ((attendingRSVPs.length / totalRSVPs) * 100)}`}
                                strokeDashoffset="0"
                              />
                            )}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-sm font-bold text-maroon-800 leading-none">{totalRSVPs}</span>
                            <span className="text-[8px] text-gold-600 font-semibold uppercase tracking-wider mt-0.5">Total</span>
                          </div>
                        </div>
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-maroon-800">
                              <span className="w-3 h-3 rounded-full bg-emerald-500" />
                              <span>Attending</span>
                            </div>
                            <span className="font-bold text-emerald-700">{attendingRSVPs.length}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-1.5 text-maroon-800">
                              <span className="w-3 h-3 rounded-full bg-gold-200" />
                              <span>Declined</span>
                            </div>
                            <span className="font-bold text-gold-700">{declinedCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex border-b border-gold-300">
                    <button
                      onClick={() => setActiveTab('rsvps')}
                      className={`px-6 py-3 font-playfair italic text-base font-bold tracking-wide border-b-2 transition-all cursor-pointer ${
                        activeTab === 'rsvps' ? 'border-gold-500 text-gold-800 bg-white/40' : 'border-transparent text-maroon-700/60 hover:text-gold-800'
                      }`}
                    >
                      RSVP Submissions ({rsvps.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('wishes')}
                      className={`px-6 py-3 font-playfair italic text-base font-bold tracking-wide border-b-2 transition-all cursor-pointer ${
                        activeTab === 'wishes' ? 'border-gold-500 text-gold-800 bg-white/40' : 'border-transparent text-maroon-700/60 hover:text-gold-800'
                      }`}
                    >
                      Wishes Feed ({wishes.length})
                    </button>
                  </div>

                  <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gold-400/25 shadow-sm overflow-hidden">
                    {activeTab === 'rsvps' ? (
                      rsvps.length === 0 ? (
                        <div className="p-12 text-center text-maroon-700 font-cormorant">No RSVPs have been submitted yet.</div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-gold-50 border-b border-gold-200 text-[10px] uppercase tracking-widest font-bold text-gold-700">
                                <th className="p-4">Name</th>
                                <th className="p-4">Attending?</th>
                                <th className="p-4">Guests</th>
                                <th className="p-4">Events</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Message</th>
                                <th className="p-4 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gold-100 text-xs">
                              {rsvps.map((r) => (
                                <tr key={r.id} className="hover:bg-gold-50/40 transition-colors">
                                  <td className="p-4 font-semibold text-maroon-800">{r.name}</td>
                                  <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      r.attending === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {r.attending === 'yes' ? 'Attending' : 'No'}
                                    </span>
                                  </td>
                                  <td className="p-4 font-bold text-maroon-800">{r.attending === 'yes' ? r.guestsCount : '—'}</td>
                                  <td className="p-4">
                                    {r.attending === 'yes' ? (
                                      <div className="flex flex-wrap gap-1">
                                        {r.events.map(ev => (
                                          <span key={ev} className="px-1.5 py-0.5 bg-gold-100 rounded text-[9px] uppercase font-bold text-gold-800">{ev}</span>
                                        ))}
                                      </div>
                                    ) : '—'}
                                  </td>
                                  <td className="p-4 text-[11px] text-maroon-800">{r.phone || <span className="text-maroon-700/40 italic">None</span>}</td>
                                  <td className="p-4 max-w-xs truncate italic text-maroon-700" title={r.message}>
                                    {r.message || <span className="text-maroon-700/40">None</span>}
                                  </td>
                                  <td className="p-4 text-center">
                                    <button onClick={() => handleDeleteRSVP(r.id)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 hover:bg-red-100 rounded transition-colors cursor-pointer">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    ) : (
                      wishes.length === 0 ? (
                        <div className="p-12 text-center text-maroon-700 font-cormorant">No wishes published in the guestbook yet.</div>
                      ) : (
                        <div className="divide-y divide-gold-100">
                          {wishes.map((w) => (
                            <div key={w.id} className="p-5 flex justify-between items-start gap-4 hover:bg-gold-50/40 transition-colors">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-playfair italic text-sm font-bold text-maroon-800">{w.name}</span>
                                  <span className="text-[9px] uppercase tracking-wider font-bold bg-gold-50 border border-gold-200 text-gold-700 px-1.5 py-0.5 rounded">{w.relation}</span>
                                </div>
                                <p className="text-xs text-maroon-800 italic font-cormorant">"{w.message}"</p>
                                <span className="block text-[10px] text-maroon-700/50">
                                  Published on: {new Date(w.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <button onClick={() => handleDeleteWish(w.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors shrink-0 cursor-pointer">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}