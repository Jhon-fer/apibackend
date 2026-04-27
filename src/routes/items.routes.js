import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = Router();

// ========================
// 👀 TODOS PUEDEN VER ITEMS
// ========================
router.get("/", authMiddleware, roleMiddleware([1, 2, 3]), async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM items");
  res.json(rows);
});

// ========================
// 👀 TODOS PUEDEN VER POR ID
// ========================
router.get("/:id", authMiddleware, roleMiddleware([1, 2, 3]), async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM items WHERE id = ?",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: "Item no encontrado" });
  }

  res.json(rows[0]);
});

// ========================
// 🟠 ADMIN + SUPERADMIN
// ========================
router.post("/", authMiddleware, roleMiddleware([2, 3]), async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // 🧠 fecha formateada (segura para MySQL)
  const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

  const [result] = await pool.query(
    "INSERT INTO items (nombre, descripcion, estado, created_at) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, estado, fecha]
  );

  res.json({
    id: result.insertId,
    nombre,
    descripcion,
    estado,
    created_at: fecha
  });
});

// ========================
// 🟠 ADMIN + SUPERADMIN
// ========================
router.put("/:id", authMiddleware, roleMiddleware([2, 3]), async (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  await pool.query(
    "UPDATE items SET nombre=?, descripcion=?, estado=? WHERE id=?",
    [nombre, descripcion, estado, req.params.id]
  );

  res.json({ mensaje: "Item actualizado" });
});

// ========================
// 🔴 SOLO SUPERADMIN
// ========================
router.delete("/:id", authMiddleware, roleMiddleware([3]), async (req, res) => {
  await pool.query("DELETE FROM items WHERE id=?", [req.params.id]);

  res.json({ mensaje: "Item eliminado" });
});

export default router;