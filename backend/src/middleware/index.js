import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_secreto";

const authMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new Error("Token de autorización no proporcionado");
      }

      const decodedToken = jwt.verify(token, JWT_SECRET);

      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (!allowedRoles.includes(user.role)) {
        throw new Error(
          "No tienes permisos suficientes para acceder a esta ruta"
        );
      }

      req.user = user;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Acceso no autorizado", error: error.message });
    }
  };
};

export default authMiddleware;
