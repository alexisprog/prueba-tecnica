import { BodyRegister, BodyLogin } from "src/models/auth";
import api from "./api";
import { User } from "src/models/user";

export const register = async (body: BodyRegister) => {
  return await api.post<User>("/auth/register", body);
};

export const login = async (body: BodyLogin) => {
  return await api.post<User>("/auth", body);
};
