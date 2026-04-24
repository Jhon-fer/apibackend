import express from "express";
import cors from "cors";
import { pool } from "./db.js";

import itemsRoutes from "./routes/items.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔓 Rutas públicas
app.use("/api", authRoutes);

// 🔒 Rutas protegidas
app.use("/api/items", itemsRoutes);

// (opcional)
app.use("/api/users", usersRoutes);

// Test DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ mensaje: "Conectado a MySQL ✅", rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 UN SOLO SERVIDOR (CORRECTO)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);
});