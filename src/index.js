import express from "express";
import cors from "cors";
import { pool } from "./db.js";

import itemsRoutes from "./routes/items.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import rolesRoutes from "./routes/roles.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔓 públicas
app.use("/api", authRoutes);

// 🔐 protegidas
app.use("/api/items", itemsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/roles", rolesRoutes);

// test DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ mensaje: "Conectado a MySQL ✅", rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en http://0.0.0.0:${PORT}`);
});