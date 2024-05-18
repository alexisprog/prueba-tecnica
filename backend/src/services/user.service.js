import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_secreto";

export const login = async (userlogin) => {
  try {
    const user = await User.findOne({
      $or: [{ username: userlogin }, { email: userlogin }],
    });
    if (!user) {
      throw new Error("Usuario no existe, registrate");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { ...user._doc, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async ({ username, email, role }) => {
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    const validRoles = ["Reader", "Creator"];
    if (!validRoles.includes(role)) {
      throw new Error("El valor del campo role no es admitido");
    }

    const user = await createUser({ username, email, role });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { ...user._doc, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("Usuario no encontrado");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      throw new Error("Usuario no encontrado");
    }
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
