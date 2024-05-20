export const categoriesApi = {
  "/api/categories": {
    post: {
      summary: "Crea una nueva categoría",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Categorías"],
      requestBody: {
        description: "Crea una nueva categoría con el nombre proporcionado",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Categoría creada exitosamente",
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Obtiene todas las categorías",
      tags: ["Categorías"],
      responses: {
        200: {
          description: "Lista de categorías obtenida exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/categories/{id}": {
    get: {
      summary: "Obtiene una categoría por su ID",
      tags: ["Categorías"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la categoría",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Categoría encontrada exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Categoría no encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: "Actualiza una categoría por su ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Categorías"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la categoría",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "Datos actualizados del categoría",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Categoría actualizado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Categoría no encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Elimina una categoría por su ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Categorías"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la categoría",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "Categoría eliminada exitosamente",
        },
        404: {
          description: "Categoría no encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const schemaCategory = {
  Category: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
    },
  },
};
