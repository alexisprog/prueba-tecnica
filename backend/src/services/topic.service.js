import Topic from "../models/Topic.js";

export const createTopic = async (topicData) => {
  try {
    const newTopic = new Topic(topicData);
    const savedTopic = await newTopic.save();
    return savedTopic;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTopics = async () => {
  try {
    const topics = await Topic.find().populate("allowedCategories");
    return topics;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTopicById = async (id) => {
  try {
    const topic = await Topic.findById(id).populate("allowedCategories");
    if (!topic) {
      throw new Error("Tematica no encontrada");
    }
    return topic;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTopic = async (id, topicData) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(id, topicData, {
      new: true,
    });
    if (!updatedTopic) {
      throw new Error("Tematica no encontrada");
    }
    return updatedTopic;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTopic = async (id) => {
  try {
    const deletedTopic = await Topic.findByIdAndRemove(id);
    if (!deletedTopic) {
      throw new Error("Tematica no encontrada");
    }
    return { message: "Tematica eliminada correctamente" };
  } catch (error) {
    throw new Error(error.message);
  }
};
