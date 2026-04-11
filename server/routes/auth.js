import express from "express";
const router = express.Router();

/**
 * POST /api/auth/login
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  if (email === "admin@gmail.com" && password === "Bismill@h123") {
    // Return a dummy secure-looking token
    return res.json({ 
      success: true, 
      token: "secret_admin_token_8899aabbcc",
      message: "Login berhasil!" 
    });
  }
  
  res.status(401).json({ success: false, message: "Email atau password salah!" });
});

export default router;
