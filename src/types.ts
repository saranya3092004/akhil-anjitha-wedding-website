/**
 * Shared Type Definitions for the Wedding App
 */

export interface Wish {
  id: string;
  name: string;
  relation: string; // e.g., "Friend of Groom", "Bride's Family", etc.
  message: string;
  createdAt: string;
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  guestsCount: number;
  attending: 'yes' | 'no';
  events: string[]; // e.g., ['marriage', 'reception']
  message?: string;
  submittedAt: string;
}
