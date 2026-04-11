import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "undangan.db");

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initTables();
  }
  return db;
}

function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS rsvp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      name TEXT NOT NULL,
      phone TEXT,
      attendance TEXT NOT NULL DEFAULT 'ACCEPT',
      guest_count INTEGER DEFAULT 1,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rsvp_id INTEGER,
      name TEXT NOT NULL,
      code TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (rsvp_id) REFERENCES rsvp(id)
    );
  `);
}

// --- RSVP ---

function submitRsvp({ code, name, phone, attendance, guest_count, message }) {
  const stmt = db.prepare(`
    INSERT INTO rsvp (code, name, phone, attendance, guest_count, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(code, name, phone, attendance, guest_count, message);

  // If there's a message, also insert into messages table
  if (message && message.trim()) {
    const msgStmt = db.prepare(`
      INSERT INTO messages (rsvp_id, name, code, message)
      VALUES (?, ?, ?, ?)
    `);
    msgStmt.run(result.lastInsertRowid, name, code, message);
  }

  return {
    id: result.lastInsertRowid,
    code,
    name,
    attendance,
    guest_count,
  };
}

function getRsvpByCode(code) {
  const stmt = db.prepare("SELECT * FROM rsvp WHERE code = ? ORDER BY created_at DESC LIMIT 1");
  return stmt.get(code);
}

// --- Messages / Wishes ---

function getMessages({ limit = 50, offset = 0 } = {}) {
  const stmt = db.prepare(`
    SELECT id, name, code, message, created_at
    FROM messages
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `);
  return stmt.all(limit, offset);
}

function getMessageCount() {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM messages");
  return stmt.get().count;
}

// --- Stats ---

function getRsvpStats() {
  const total = db.prepare("SELECT COUNT(*) as count FROM rsvp").get().count;
  const attending = db.prepare("SELECT COUNT(*) as count FROM rsvp WHERE attendance = 'ACCEPT'").get().count;
  const declining = db.prepare("SELECT COUNT(*) as count FROM rsvp WHERE attendance = 'DECLINE'").get().count;
  const totalGuests = db.prepare("SELECT COALESCE(SUM(guest_count), 0) as total FROM rsvp WHERE attendance = 'ACCEPT'").get().total;

  return { total, attending, declining, totalGuests };
}

export default {
  getDb,
  submitRsvp,
  getRsvpByCode,
  getMessages,
  getMessageCount,
  getRsvpStats,
};
