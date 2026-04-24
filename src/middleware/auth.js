import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secreto123";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};