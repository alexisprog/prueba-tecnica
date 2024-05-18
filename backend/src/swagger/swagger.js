import { userApi, schemaUser } from "./user.doc.js";
import { categoriesApi, schemaCategory } from "./categories.doc.js";
import { schemaTopic, topicApi } from "./topic.doc.js";
import { schemaContent, contentApi } from "./content.doc.js";
import { authApi, schemaAuth } from "./auth.doc.js";

const tags = [
  {
    name: "Autenticación",
    description: "Operaciones relacionadas con sesión de usuarios",
  },
  {
    name: "Usuarios",
    description: "Operaciones relacionadas con usuarios",
  },
  {
    name: "Categorías",
    description: "Operaciones relacionadas con las categorías",
  },
  {
    name: "Temáticas",
    description: "Operaciones relacionadas con las temáticas",
  },
  {
    name: "Contenidos",
    description: "Operaciones relacionadas con los contenidos",
  },
];

const swaggerDocument = {
  openapi: "3.1.0",
  info: {
    title: "API doc",
    version: "1.0.0",
  },
  tags,
  paths: {
    ...authApi,
    ...userApi,
    ...categoriesApi,
    ...topicApi,
    ...contentApi,
  },
  components: {
    schemas: {
      ...schemaAuth,
      ...schemaUser,
      ...schemaCategory,
      ...schemaTopic,
      ...schemaContent,
    },
  },
};
export default swaggerDocument;
