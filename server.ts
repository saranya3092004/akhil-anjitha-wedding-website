import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const _filename = typeof import.meta !== 'undefined' && import.meta.url
  ? fileURLToPath(import.meta.url)
  : (typeof __filename !== 'undefined' ? __filename : '');

const _dirname = typeof import.meta !== 'undefined' && import.meta.url
  ? path.dirname(_filename)
  : (typeof __dirname !== 'undefined' ? __dirname : '');

// Interfaces
interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  guestsCount: number;
  attending: 'yes' | 'no';
  events: string[];
  foodPreference: 'veg' | 'non-veg';
  message?: string;
  submittedAt: string;
}

interface DatabaseSchema {
  wishes: Wish[];
  rsvps: RSVP[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Default initial data to populate the digital guestbook and RSVPs


function initDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ wishes: defaultWishes, rsvps: defaultRSVPs }, null, 2));
  }
}

function readDatabase(): DatabaseSchema {
  try {
    initDatabase();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database, resetting to defaults:", err);
    return { wishes: defaultWishes, rsvps: defaultRSVPs };
  }
}

function writeDatabase(data: DatabaseSchema) {
  try {
    initDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Endpoints
  
  // 1. Get wishes (accessible to all)
  app.get('/api/wishes', (req, res) => {
    const db = readDatabase();
    // Sort wishes descending (newest first)
    const sortedWishes = [...db.wishes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(sortedWishes);
  });

  // 2. Add a new wish
  app.post('/api/wishes', (req, res) => {
    const { name, relation, message } = req.body;
    
    if (!name || !relation || !message) {
      return res.status(400).json({ error: "Name, relation, and message are required." });
    }

    const db = readDatabase();
    const newWish: Wish = {
      id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      relation: relation.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    db.wishes.push(newWish);
    writeDatabase(db);

    res.status(201).json(newWish);
  });

  // 3. Delete a wish (Admin protected)
  app.delete('/api/wishes/:id', (req, res) => {
    const { id } = req.params;
    const adminKey = req.headers['x-admin-key'];

    if (adminKey !== 'wedding2026' && adminKey !== 'love') {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const db = readDatabase();
    const filteredWishes = db.wishes.filter(w => w.id !== id);
    
    if (filteredWishes.length === db.wishes.length) {
      return res.status(404).json({ error: "Wish not found." });
    }

    db.wishes = filteredWishes;
    writeDatabase(db);
    res.json({ success: true, message: "Wish deleted successfully." });
  });

  // 4. Submit an RSVP
  app.post('/api/rsvps', (req, res) => {
    const { name, email, phone, guestsCount, attending, events, foodPreference, message } = req.body;

    if (!name || !attending) {
      return res.status(400).json({ error: "Name and attendance status are required." });
    }

    const db = readDatabase();
    const newRSVP: RSVP = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      guestsCount: Number(guestsCount) || 1,
      attending: attending,
      events: Array.isArray(events) ? events : [],
      foodPreference: foodPreference || 'veg',
      message: (message || '').trim(),
      submittedAt: new Date().toISOString()
    };

    db.rsvps.push(newRSVP);
    writeDatabase(db);

    res.status(201).json(newRSVP);
  });

  // 5. Get RSVPs (Admin protected to ensure guest privacy)
  app.get('/api/rsvps', (req, res) => {
    const adminKey = req.headers['x-admin-key'];

    if (adminKey !== 'wedding2026' && adminKey !== 'love') {
      return res.status(401).json({ error: "Unauthorized access. Please enter the admin code to view RSVP submissions." });
    }

    const db = readDatabase();
    // Sort RSVPs descending (newest first)
    const sortedRSVPs = [...db.rsvps].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    res.json(sortedRSVPs);
  });

  // 6. Delete RSVP (Admin protected)
  app.delete('/api/rsvps/:id', (req, res) => {
    const { id } = req.params;
    const adminKey = req.headers['x-admin-key'];

    if (adminKey !== 'wedding2026' && adminKey !== 'love') {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const db = readDatabase();
    const filteredRSVPs = db.rsvps.filter(r => r.id !== id);

    if (filteredRSVPs.length === db.rsvps.length) {
      return res.status(404).json({ error: "RSVP record not found." });
    }

    db.rsvps = filteredRSVPs;
    writeDatabase(db);
    res.json({ success: true, message: "RSVP record deleted successfully." });
  });

  // Vite development middleware or production static asset server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
