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

// Rutas
app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);
app.use("/", authRoutes); // login y register

// Test DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ mensaje: "Conectado a MySQL ✅", rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});