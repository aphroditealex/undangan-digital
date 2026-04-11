import express from "express";
import db from "../database.js";
const router = express.Router();

/**
 * GET /api/messages
 * Fetch guest book messages
 * Query: ?page=1&limit=50
 */
router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const messages = db.getMessages({ limit, offset });
    const total = db.getMessageCount();

    // Format data to match frontend structure (guest_book.name)
    const formattedMessages = messages.map(msg => ({
      id: msg.id.toString(),
      message: msg.message,
      created_at: msg.created_at + 'Z', // Append Z to parse as UTC if SQLite outputs local
      guest_book: {
        name: msg.name,
        code: msg.code || null
      }
    }));

    res.json({
      success: true,
      data: formattedMessages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
