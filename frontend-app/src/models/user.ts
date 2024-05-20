export enum Role {
  "Admin" = "Admin",
  "Creator" = "Creator",
  "Reader" = "Reader",
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  token?: string;
}
