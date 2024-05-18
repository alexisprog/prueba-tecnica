import * as contentServices from "../services/content.service.js";

export const createContent = async (req, res) => {
  try {
    const { name, data, category, topic, credits } = req.body;
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
    const contents = await contentServices.getContents();
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
    const { id } = req.params;
    const { name, data, category, topic, credits } = req.body;
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
