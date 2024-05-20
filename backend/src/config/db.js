import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/mi_base_de_datos";

export async function connect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}
