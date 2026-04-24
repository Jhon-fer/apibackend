import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

const SECRET = "secreto123";

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "El usuario ya existe" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }

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