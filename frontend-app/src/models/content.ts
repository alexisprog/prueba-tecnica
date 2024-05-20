import { Category } from "./category";
import { Topic } from "./topic";
import { User } from "./user";

export interface Content {
  _id: string;
  name: string;
  data: string;
  category: Category;
  topic: Topic;
  credits: User;
  createdAt: string;
  updatedAt: string;
}

export interface FiltersContent {
  name: string;
  data: string;
  category: string;
  topic: string;
  credits: string;
}

export interface BodyContent {
  name: string;
  data: string;
  category: string;
  topic: string;
}
