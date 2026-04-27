import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secreto123";

// ==========================
// 🔐 AUTH MIDDLEWARE
// ==========================
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // 👈 aquí viaja id, email, role_id
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};

// ==========================
// 🔐 ROLE MIDDLEWARE
// ==========================
export const roleMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    if (!rolesPermitidos.includes(req.user.role_id)) {
      return res.status(403).json({
        mensaje: "No tienes permisos para esta acción"
      });
    }

    next();
  };
};