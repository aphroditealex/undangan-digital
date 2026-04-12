-- ============================================
-- Supabase SQL: Undangan Digital Tables
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. RSVP Table
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL DEFAULT 'ACCEPT',
  guest_count INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Messages Table (for wishes/ucapan)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rsvp_id UUID REFERENCES rsvp(id),
  name TEXT NOT NULL,
  code TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Anyone can INSERT RSVP (guests submitting their attendance)
CREATE POLICY "Anyone can insert rsvp" ON rsvp
  FOR INSERT WITH CHECK (true);

-- Anyone can SELECT rsvp (admin will use this; also needed for check by code)
CREATE POLICY "Anyone can read rsvp" ON rsvp
  FOR SELECT USING (true);

-- Anyone can INSERT messages (guests sending wishes)
CREATE POLICY "Anyone can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Anyone can SELECT messages (for displaying floating wishes)
CREATE POLICY "Anyone can read messages" ON messages
  FOR SELECT USING (true);

-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rsvp_code ON rsvp(code);
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
