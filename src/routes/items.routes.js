import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.js"; // 🔒 IMPORTANTE

const router = Router();

// GET todos
router.get("/", authMiddleware, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM items");
  res.json(rows);
});

// GET por ID
router.get("/:id", authMiddleware, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM items WHERE id = ?",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  res.json(rows[0]);
});

// POST crear
router.post("/", authMiddleware, async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  const [result] = await pool.query(
    "INSERT INTO items (nombre, descripcion, estado) VALUES (?, ?, ?)",
    [nombre, descripcion, estado]
  );

  res.json({
    id: result.insertId,
    nombre,
    descripcion,
    estado
  });
});

// PUT actualizar
router.put("/:id", authMiddleware, async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  await pool.query(
    "UPDATE items SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?",
    [nombre, descripcion, estado, req.params.id]
  );

  res.json({ mensaje: "Item actualizado" });
});

// DELETE eliminar
router.delete("/:id", authMiddleware, async (req, res) => {
  await pool.query("DELETE FROM items WHERE id = ?", [req.params.id]);

  res.json({ mensaje: "Item eliminado" });
});

export default router;