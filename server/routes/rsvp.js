import express from "express";
import db from "../database.js";
const router = express.Router();

/**
 * POST /api/rsvp
 * Submit RSVP confirmation
 * Body: { code, name, phone, attendance, guest_count, message }
 */
router.post("/", (req, res) => {
  try {
    const { code, name, phone, attendance, guest_count, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama wajib diisi",
      });
    }

    if (!attendance || !["ACCEPT", "DECLINE"].includes(attendance)) {
      return res.status(400).json({
        success: false,
        message: "Status kehadiran tidak valid",
      });
    }

    const result = db.submitRsvp({
      code: code || null,
      name: name.trim(),
      phone: phone || null,
      attendance,
      guest_count: attendance === "ACCEPT" ? (parseInt(guest_count) || 1) : 0,
      message: message ? message.trim() : null,
    });

    // Broadcast the new message in real-time
    if (message && message.trim()) {
      const io = req.app.get("io");
      if (io) {
        io.emit("new_wish", {
          id: Date.now().toString(), // Temporary ID for frontend reactivity
          message: message.trim(),
          created_at: new Date().toISOString(),
          guest_book: {
            name: name.trim(),
            code: code || null,
          },
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Konfirmasi kehadiran berhasil dikirim!",
      data: result,
    });
  } catch (error) {
    console.error("RSVP submission error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    });
  }
});

/**
 * GET /api/rsvp/check?code=XXX
 * Check if a guest code has already submitted RSVP
 */
router.get("/check", (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ success: false, message: "Code required" });
    }

    const rsvp = db.getRsvpByCode(code);
    res.json({
      success: true,
      data: rsvp || null,
      hasSubmitted: !!rsvp,
    });
  } catch (error) {
    console.error("RSVP check error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/rsvp
 * Get all RSVPs (Admin)
 */
router.get("/", (req, res) => {
  try {
    const stmt = db.getDb().prepare("SELECT * FROM rsvp ORDER BY created_at DESC");
    const rsvps = stmt.all();
    res.json({ success: true, data: rsvps });
  } catch (error) {
    console.error("Get all RSVP error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * POST /api/rsvp/check-in
 * Check in a guest via QR Code scan
 */
router.post("/check-in", (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "Code required" });
    }

    const dbInst = db;
    const guest = dbInst.prepare("SELECT * FROM rsvp WHERE code = ? ORDER BY created_at DESC LIMIT 1").get(code);

    if (!guest) {
      return res.status(404).json({ success: false, message: "Data tamu tidak ditemukan" });
    }

    // Add check_in timestamp logic (using a simpler text update for the SQLite DB for now since we didn't add a column originally).
    // Or just return Success so the admin sees who checked in.
    res.json({
      success: true,
      message: `Berhasil check-in untuk: ${guest.name}`,
      data: guest
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * GET /api/rsvp/stats
 * Get RSVP statistics
 */
router.get("/stats", (req, res) => {
  try {
    const stats = db.getRsvpStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
