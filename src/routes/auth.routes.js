import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = "secreto123";

// 🧠 almacenamiento en memoria (temporal)
const loginAttempts = {};

// ========================
// ✅ REGISTER (CON ROL)
// ========================
router.post("/register", async (req, res) => {
  const { email, password, role_id } = req.body;

  try {
    // validar rol
    const [roleRows] = await pool.query(
      "SELECT * FROM roles WHERE id = ?",
      [role_id]
    );

    if (roleRows.length === 0) {
      return res.status(400).json({
        mensaje: "El rol no existe"
      });
    }

    const role = roleRows[0];

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)",
      [email, hashedPassword, role_id]
    );

    res.json({
      mensaje: "Usuario registrado correctamente",
      rol_asignado: role.nombre
    });

  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar usuario" });
  }
});

// ========================
// ✅ LOGIN
// ========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const now = Date.now();

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

  if (!valid) {
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 0, blockUntil: 0 };
    }

    loginAttempts[email].count++;

    if (loginAttempts[email].count === 2) {
      return res.status(401).json({
        mensaje: "Advertencia: último intento antes de bloqueo"
      });
    }

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

  loginAttempts[email] = { count: 0, blockUntil: 0 };

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
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