import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = "secreto123";

// 🧠 almacenamiento en memoria (temporal)
const loginAttempts = {};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const now = Date.now();

  // 🔴 si está bloqueado
  if (loginAttempts[email]?.blockUntil > now) {
    const wait = Math.ceil((loginAttempts[email].blockUntil - now) / 1000);
    return res.status(429).json({
      mensaje: `Demasiados intentos. Espera ${wait} segundos`
    });
  }

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ mensaje: "Usuario no existe" });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);

  // ❌ contraseña incorrecta
  if (!valid) {
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 0, blockUntil: 0 };
    }

    loginAttempts[email].count++;

    // ⚠️ advertencia en 2 intentos
    if (loginAttempts[email].count === 2) {
      return res.status(401).json({
        mensaje: "Advertencia: último intento antes de bloqueo"
      });
    }

    // 🚫 tercer intento → bloqueo 30s
    if (loginAttempts[email].count >= 3) {
      loginAttempts[email].blockUntil = now + 30 * 1000;
      loginAttempts[email].count = 0;

      return res.status(429).json({
        mensaje: "Cuenta bloqueada por 30 segundos"
      });
    }

    return res.status(401).json({
      mensaje: "Credenciales incorrectas"
    });
  }

  // ✅ login correcto → reset intentos
  loginAttempts[email] = { count: 0, blockUntil: 0 };

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      unique: Date.now()
    },
    SECRET,
    { expiresIn: "10m" }
  );

  res.json({
    mensaje: "Login exitoso",
    token
  });
});

export default router;