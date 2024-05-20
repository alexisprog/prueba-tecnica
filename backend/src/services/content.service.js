import Content from "../models/Content.js";
import { getCategoryById } from "./category.service.js";
import { getTopicById } from "./topic.service.js";

export const createContent = async (contentData) => {
  try {
    await getCategoryById(contentData.category);
    await getTopicById(contentData.topic);
    const newContent = new Content(contentData);
    const savedContent = await newContent.save();
    return savedContent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getContents = async (query) => {
  try {
    const filters = {};
    if (query?.credits) {
      filters["credits"] = query.credits;
    }
    if (query?.topic) {
      filters["topic"] = query.topic;
    }
    if (query?.category) {
      filters["category"] = query.category;
    }

    const contents = await Content.find(filters)
      .sort({ createdAt: -1 })
      .populate(["credits", "topic", "category"]);
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

export const deleteContent = async (_id) => {
  try {
    const deletedContent = await Content.deleteOne({ _id });
    if (!deletedContent) {
      throw new Error("Contenido no encontrado");
    }
    return { message: "Contenido eliminado correctamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
