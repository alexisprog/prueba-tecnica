export const topicApi = {
  "/api/topics": {
    post: {
      tags: ["Temáticas"],
      summary: "Crear una nueva temática",
      description: "Crea una nueva temática con los datos proporcionados",
      requestBody: {
        description: "Datos del nuevo usuario",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                allowedCategories: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["name"],
              example: {
                name: "Deportes",
                allowedCategories: [
                  "66483132fbd80ca97d3838a0",
                  "66483139fbd80ca97d3838a2",
                ],
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Temática creada exitosamente",
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              allowedCategories: {
                type: "array",
                items: {
                  type: "string",
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
        consumes: ["application/json"],
        produces: ["application/json"],
      },
    },
    get: {
      tags: ["Temáticas"],
      summary: "Obtener todas las temáticas",
      description: "Obtiene una lista de todas las temáticas disponibles",
      responses: {
        200: {
          description: "Lista de temáticas",
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
                    allowedCategories: {
                      type: "array",
                      items: {
                        type: "string",
                      },
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
  "/api/topics/{id}": {
    get: {
      tags: ["Temáticas"],
      summary: "Obtener una temática por su ID",
      description: "Obtiene una temática específica utilizando su ID",
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la temática",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Temática encontrada",
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
          description: "Temática no encontrada",
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
      tags: ["Temáticas"],
      summary: "Actualizar una temática por su ID",
      description: "Actualizar una temática con los datos proporcionados",
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la temática",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "body",
          in: "body",
          description: "Datos de la temática",
          required: true,
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              allowedCategories: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["name", "allowedCategories"],
            example: {
              name: "Deportes",
              allowedCategories: [
                "66483132fbd80ca97d3838a0",
                "66483139fbd80ca97d3838a2",
              ],
            },
          },
        },
      ],
      responses: {
        200: {
          description: "Temática actualizada exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  allowedCategories: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Temática no encontrada",
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
      summary: "Elimina una temática por su ID",
      tags: ["Temáticas"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID de la temática",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "Temática eliminada exitosamente",
        },
        404: {
          description: "Temática no encontrada",
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

export const schemaTopic = {
  Topic: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      allowedCategories: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
};
