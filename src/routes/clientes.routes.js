import { Router } from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// 🔐 proteger rutas
router.use(authMiddleware);

// 👀 CLIENTES CON PRODUCTO (JOIN)
router.get("/detalle", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, i.nombre AS producto
      FROM clientes c
      JOIN items i ON c.item_id = i.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ CREAR CLIENTE
router.post("/", async (req, res) => {
  const { nombre, apellido, DNI, celular, direccion, item_id, tipo_comprobante } = req.body;

  // validaciones básicas
  if (!nombre || !apellido || !DNI || !celular) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  if (!/^\d{8}$/.test(DNI)) {
    return res.status(400).json({ mensaje: "DNI debe tener 8 dígitos" });
  }

  if (!/^\d{9}$/.test(celular)) {
    return res.status(400).json({ mensaje: "Celular debe tener 9 dígitos" });
  }

  if (tipo_comprobante && !["boleta", "factura"].includes(tipo_comprobante)) {
    return res.status(400).json({ mensaje: "tipo_comprobante inválido" });
  }

  try {
    // validar item_id
    if (item_id) {
      const [item] = await pool.query(
        "SELECT id FROM items WHERE id = ?",
        [item_id]
      );

      if (item.length === 0) {
        return res.status(404).json({ mensaje: "Ese producto no existe" });
      }
    }

    // insertar cliente
    const [result] = await pool.query(
      `INSERT INTO clientes 
      (nombre, apellido, DNI, celular, direccion, item_id, tipo_comprobante)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, DNI, celular, direccion, item_id || null, tipo_comprobante || null]
    );

    res.json({
      id: result.insertId,
      nombre,
      apellido,
      DNI,
      celular,
      direccion,
      item_id: item_id || null,
      tipo_comprobante: tipo_comprobante || null
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👀 VER TODOS
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  res.json(rows);
});

// 👀 VER UNO
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM clientes WHERE id = ?",
    [req.params.id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensaje: "Cliente no encontrado" });
  }

  res.json(rows[0]);
});

// ✏️ ACTUALIZAR
router.put("/:id", async (req, res) => {
  const { nombre, apellido, DNI, celular, direccion, item_id, tipo_comprobante } = req.body;

  if (tipo_comprobante && !["boleta", "factura"].includes(tipo_comprobante)) {
    return res.status(400).json({ mensaje: "tipo_comprobante inválido" });
  }

  await pool.query(
    `UPDATE clientes 
     SET nombre=?, apellido=?, DNI=?, celular=?, direccion=?, item_id=?, tipo_comprobante=?
     WHERE id=?`,
    [nombre, apellido, DNI, celular, direccion, item_id, tipo_comprobante, req.params.id]
  );

  res.json({ mensaje: "Cliente actualizado" });
});

// 🗑 ELIMINAR
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM clientes WHERE id = ?", [req.params.id]);
  res.json({ mensaje: "Cliente eliminado" });
});

export default router;