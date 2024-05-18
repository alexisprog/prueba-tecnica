import Category from "../models/Category.js";

export const createCategory = async (categoryData) => {
  try {
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategories = async () => {
  try {
    const categorys = await Category.find();
    return categorys;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Categoria no encontrada");
    }
    return category;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    if (!updatedCategory) {
      throw new Error("Categoria no encontrada");
    }
    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(id);
    if (!deletedCategory) {
      throw new Error("Categoria no encontrada");
    }
    return { message: "Categoria eliminada correctamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
