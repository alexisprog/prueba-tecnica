import { Topic } from "src/models/topic";
import api from "./api";

export const getAllTopics = async () => {
  return await api.get<Topic[]>("/topics");
};

export const deleteTopic = async (_id: string) => {
  return await api.remove<string>(`/topics/${_id}`);
};
