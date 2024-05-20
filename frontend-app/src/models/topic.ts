import { Category } from "./category";

export interface Topic {
  _id: string;
  name: string;
  allowedCategories: Category[];
  createdAt: string;
  updatedAt: string;
}
