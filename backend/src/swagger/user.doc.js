export const userApi = {
  "/api/users": {
    post: {
      summary: "Crea un nuevo usuario",
      tags: ["Usuarios"],
      requestBody: {
        description: "Datos del nuevo usuario",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                role: {
                  type: "string",
                  description: "Rol del usuario",
                  enum: ["Admin", "Reader", "Creator"],
                },
              },
              required: ["username", "email", "role"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuario creado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  role: {
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
      summary: "Obtiene todos los usuarios",
      tags: ["Usuarios"],
      responses: {
        200: {
          description: "Lista de usuarios obtenida exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    role: {
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
  "/api/users/{id}": {
    get: {
      summary: "Obtiene un usuario por su ID",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del usuario",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Usuario encontrado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuario no encontrado",
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
      summary: "Actualiza un usuario por su ID",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del usuario",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "Datos actualizados del usuario",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Usuario actualizado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuario no encontrado",
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
      summary: "Elimina un usuario por su ID",
      tags: ["Usuarios"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID del usuario",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "Usuario eliminado exitosamente",
        },
        404: {
          description: "Usuario no encontrado",
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

export const schemaUser = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      username: {
        type: "string",
      },
      email: {
        type: "string",
      },
      role: {
        type: "string",
        enum: ["Admin", "Reader", "Creator"],
      },
    },
  },
};
