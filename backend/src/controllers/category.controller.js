import * as categoryServices from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryServices.createCategory({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryServices.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categoryServices.updateCategory(id, {
      name,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryServices.deleteCategory(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.status(200).json({ message: "Categoria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
