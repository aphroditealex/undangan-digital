import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import db from './database.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allows all origins for local dev
  }
});

// Attach socket IO to req so we can broadcast from routes
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected for real-time wishes:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
db.getDb();

// Routes
import rsvpRoutes from './routes/rsvp.js';
import messagesRoutes from './routes/messages.js';
import authRoutes from './routes/auth.js';

app.use('/api/v1/rsvp', rsvpRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Undangan API is running' });
});

// Mock initial data load (simulate abadikan.id config endpoint)
app.get('/api/v1/invitations/slug/:slug', (req, res) => {
  // Normally this would fetch the full config from the DB. 
  // For now, we will just return a structured mock if we want, or the frontend can continue using mockData.js for the config, and only use API for dynamic stuff (RSVP & Messages).
  res.json({ message: 'Config endpoint placeholder' });
});

httpServer.listen(PORT, () => {
  console.log(`Backend & Socket.IO running on http://localhost:${PORT}`);
});
