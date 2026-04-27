import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = Router();

// 🔐 TODAS LAS RUTAS REQUIEREN LOGIN
router.use(authMiddleware);

// ========================
// 👑 SOLO SUPERADMIN - VER TODOS
// ========================
router.get("/", roleMiddleware([3]), async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, email, role_id FROM users"
  );
  res.json(rows);
});

// ========================
// 👑 SOLO SUPERADMIN - VER UNO
// ========================
router.get("/:id", roleMiddleware([3]), async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, email, role_id FROM users WHERE id = ?",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json(rows[0]);
});

// ========================
// 🟠 ADMIN + SUPERADMIN - CREAR USUARIO
// ========================
router.post("/", roleMiddleware([2, 3]), async (req, res) => {
  const { email, password, role_id } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)",
    [email, hashedPassword, role_id || 1]
  );

  res.json({
    id: result.insertId,
    email,
    role_id: role_id || 1
  });
});

// ========================
// 👑 SOLO SUPERADMIN - EDITAR USUARIO
// ========================
router.put("/:id", roleMiddleware([3]), async (req, res) => {
  const { email, password, role_id } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "UPDATE users SET email = ?, password = ?, role_id = ? WHERE id = ?",
    [email, hashedPassword, role_id, req.params.id]
  );

  res.json({ mensaje: "Usuario actualizado" });
});

// ========================
// 👑 SOLO SUPERADMIN - ELIMINAR USUARIO
// ========================
router.delete("/:id", roleMiddleware([3]), async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);

  res.json({ mensaje: "Usuario eliminado" });
});

export default router;