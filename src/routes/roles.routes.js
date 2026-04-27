import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = Router();

// 🔐 SOLO LOGUEADOS
router.use(authMiddleware);

// 👑 SOLO SUPERADMIN - CAMBIAR ROLES
router.put("/:id", roleMiddleware([3]), async (req, res) => {
  const { role_id } = req.body;

  // validar que exista el rol
  const [role] = await pool.query(
    "SELECT id FROM roles WHERE id = ?",
    [role_id]
  );

  if (role.length === 0) {
    return res.status(400).json({ mensaje: "Rol no existe" });
  }

  await pool.query(
    "UPDATE users SET role_id = ? WHERE id = ?",
    [role_id, req.params.id]
  );

  res.json({
    mensaje: "Rol actualizado correctamente",
    nuevo_rol: role_id
  });
});

export default router;