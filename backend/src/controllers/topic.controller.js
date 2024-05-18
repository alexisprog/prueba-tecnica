import * as topicServices from "../services/topic.service.js";

export const createTopic = async (req, res) => {
  try {
    const { name, allowedCategories } = req.body;
    const newTopic = await topicServices.createTopic({
      name,
      allowedCategories,
    });
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await topicServices.getTopics();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await topicServices.getTopicById(id);
    if (!topic) {
      return res.status(404).json({ message: "Tematica no encontrada" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, allowedCategories } = req.body;
    const updatedTopic = await topicServices.updateTopic(id, {
      name,
      allowedCategories,
    });
    if (!updatedTopic) {
      return res.status(404).json({ message: "Tematica no encontrada" });
    }
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await topicServices.deleteTopic(id);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Tematica no encontrada" });
    }
    res.status(200).json({ message: "Tematica eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
