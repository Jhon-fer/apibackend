import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";

const router = Router();
const SECRET = "secreto123";

// 🧠 intentos en memoria (solo runtime)
const loginAttempts = {};

// ========================
// REGISTER
// ========================
router.post("/register", async (req, res) => {
  const { email, password, role_id } = req.body;

  try {
    const [roleRows] = await pool.query(
      "SELECT * FROM roles WHERE id = ?",
      [role_id]
    );

    if (roleRows.length === 0) {
      return res.status(400).json({ mensaje: "El rol no existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)",
      [email, hashedPassword, role_id]
    );

    res.json({
      mensaje: "Usuario registrado correctamente",
      rol_asignado: roleRows[0].nombre
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
});


// ========================
// LOGIN
// ========================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const now = Date.now();

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ mensaje: "Usuario no existe" });
  }

  const user = rows[0];

  // 🔴 BLOQUEO ADMIN (permanente)
  if (user.blocked == 1 && user.role_id !== 3) {
    return res.status(403).json({
      mensaje: "Usuario bloqueado por administrador"
    });
  }

  // 👑 SUPERADMIN (bloqueo temporal 30s)
  if (
    user.role_id === 3 &&
    loginAttempts[email]?.blockUntil > now
  ) {
    const wait = Math.ceil(
      (loginAttempts[email].blockUntil - now) / 1000
    );

    return res.status(429).json({
      mensaje: `Superadmin bloqueado ${wait}s`
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 0, blockUntil: 0 };
    }

    loginAttempts[email].count++;

    // 👑 SUPERADMIN: bloqueo temporal
    if (user.role_id === 3) {
      if (loginAttempts[email].count >= 3) {
        loginAttempts[email].blockUntil = now + 30 * 1000;
        loginAttempts[email].count = 0;

        return res.status(429).json({
          mensaje: "Superadmin bloqueado por 30 segundos"
        });
      }
    }

    // 👤 USUARIOS NORMALES: bloqueo permanente
    else {
      if (loginAttempts[email].count >= 3) {
        await pool.query(
          "UPDATE users SET blocked = 1 WHERE id = ?",
          [user.id]
        );

        loginAttempts[email].count = 0;

        return res.status(403).json({
          mensaje: "Usuario bloqueado. Contacte al superadmin"
        });
      }
    }

    return res.status(401).json({
      mensaje: "Credenciales incorrectas"
    });
  }

  // reset intentos
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


// ========================
// UNLOCK USER (SOLO SUPERADMIN)
// ========================
router.put(
  "/unlock/:id",
  authMiddleware,
  roleMiddleware([3]),
  async (req, res) => {
    await pool.query(
      "UPDATE users SET blocked = 0 WHERE id = ?",
      [req.params.id]
    );

    res.json({
      mensaje: "Usuario desbloqueado por superadmin"
    });
  }
);

export default router;