import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";

const router = Router();

// GET todos los usuarios
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT id, email FROM users");
  res.json(rows);
});

// GET usuario por ID
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, email FROM users WHERE id = ?",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json(rows[0]);
});

// POST crear usuario
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );

  res.json({
    id: result.insertId,
    email
  });
});

// PUT actualizar usuario
router.put("/:id", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "UPDATE users SET email = ?, password = ? WHERE id = ?",
    [email, hashedPassword, req.params.id]
  );

  res.json({ mensaje: "Usuario actualizado" });
});

// DELETE eliminar usuario
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);

  res.json({ mensaje: "Usuario eliminado" });
});

export default router;