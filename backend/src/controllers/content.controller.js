import fs from "fs";
import multer from "multer";
import * as contentServices from "../services/content.service.js";

// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./images"; // Carpeta de destino para las imágenes
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Crea la carpeta si no existe
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usa el nombre original del archivo
  },
});
export const upload = multer({ storage });

export const createContent = async (req, res) => {
  try {
    const credits = req.user._id;
    const { name, data, category, topic } = req.body;
    const newContent = await contentServices.createContent({
      name,
      data,
      category,
      topic,
      credits,
    });
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContents = async (req, res) => {
  try {
    const query = req.query;
    const contents = await contentServices.getContents(query);
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await contentServices.getContentById(id);
    if (!content) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const credits = req.user._id;
    const { id } = req.params;
    const { name, data, category, topic } = req.body;
    const updatedContent = await contentServices.updateContent(id, {
      name,
      data,
      category,
      topic,
      credits,
    });
    if (!updatedContent) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await contentServices.deleteContent(id);
    if (!deletedContent) {
      return res.status(404).json({ message: "Contenido no encontrado" });
    }
    res.status(200).json({ message: "Contenido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const filename = req.file.filename;
    res.status(201).json({ fileName: filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
