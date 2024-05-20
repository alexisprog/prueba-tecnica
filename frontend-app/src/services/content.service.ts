import api from "./api";
import { BodyContent, Content, FiltersContent } from "src/models/content";

export const getContentsFilters = async (params: Partial<FiltersContent>) => {
  const config = {
    params,
  };
  return await api.get<Content[]>("/contents", config);
};

export const createContent = async (body: BodyContent) => {
  return await api.post<Content>("/contents", body);
};

export const uploadImage = async (selectedFile: File) => {
  const formData = new FormData();
  formData.append("image", selectedFile);
  return await api.post<{ fileName: string }>("/contents/upload", formData);
};

export const updateContent = async (_id: string, body: BodyContent) => {
  return await api.put<Content>(`/contents/${_id}`, body);
};

export const deleteContent = async (_id: string) => {
  return await api.remove<string>(`/contents/${_id}`);
};
