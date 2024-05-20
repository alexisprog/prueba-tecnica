export const contentApi = {
  "/api/contents": {
    post: {
      summary: "Crea un nuevo contenido",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Contenidos"],
      requestBody: {
        description: "Datos del nuevo contenido",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                data: {
                  type: "string",
                },
                category: {
                  type: "string",
                },
                topic: {
                  type: "string",
                },
                credits: {
                  type: "string",
                },
              },
              required: ["name", "data", "category", "topic", "credits"],
              example: {
                name: "Goles de Messi",
                data: "http://videourlyoutubeejemplo.com",
                category: "66483139fbd80ca97d3838a2",
                topic: "664839f0465a3f3841a5ff4e",
                credits: "6648247243c75a9f9f001e68",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Contenido creado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  data: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  topic: {
                    type: "string",
                  },
                  credits: {
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
    get: {
      summary: "Obtiene todos los contenidos",
      tags: ["Contenidos"],
      responses: {
        200: {
          description: "Lista de contenidos obtenida exitosamente",
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
                    data: {
                      type: "string",
                    },
                    category: {
                      type: "string",
                    },
                    topic: {
                      type: "string",
                    },
                    credits: {
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
  "/api/contents/{id}": {
    get: {
      summary: "Obtiene un contenido por su ID",
      tags: ["Contenidos"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del contenido",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Contenido encontrado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  data: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  topic: {
                    type: "string",
                  },
                  credits: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Contenido no encontrado",
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
      summary: "Actualiza un contenido por su ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Contenidos"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del contenido",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "Datos actualizados del contenido",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                data: {
                  type: "string",
                },
                category: {
                  type: "string",
                },
                topic: {
                  type: "string",
                },
                credits: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Contenido actualizado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  data: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  topic: {
                    type: "string",
                  },
                  credits: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Contenido no encontrado",
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
      summary: "Elimina un contenido por su ID",
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Contenidos"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del contenido",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "Contenido eliminado exitosamente",
        },
        404: {
          description: "Contenido no encontrado",
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

export const schemaContent = {
  Content: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      data: {
        type: "string",
      },
      category: {
        type: "string",
      },
      topic: {
        type: "string",
      },
      credits: {
        type: "string",
      },
    },
  },
};
