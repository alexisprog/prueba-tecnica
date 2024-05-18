import Content from "../models/Content.js";

export const createContent = async (contentData) => {
  try {
    const newContent = new Content(contentData);
    const savedContent = await newContent.save();
    return savedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getContents = async () => {
  try {
    const contents = await Content.find().populate([
      "credits",
      "topic",
      "category",
    ]);
    return contents;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getContentById = async (id) => {
  try {
    const content = await Content.findById(id).populate([
      "credits",
      "topic",
      "category",
    ]);
    if (!content) {
      throw new Error("Contenido no encontrado");
    }
    return content;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateContent = async (id, contentData) => {
  try {
    const updatedContent = await Content.findByIdAndUpdate(id, contentData, {
      new: true,
    });
    if (!updatedContent) {
      throw new Error("Contenido no encontrado");
    }
    return updatedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteContent = async (id) => {
  try {
    const deletedContent = await Content.findByIdAndRemove(id);
    if (!deletedContent) {
      throw new Error("Contenido no encontrado");
    }
    return { message: "Contenido eliminado correctamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
