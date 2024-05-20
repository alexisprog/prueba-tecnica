export const authApi = {
  "/api/auth": {
    post: {
      summary: "Iniciar sesión",
      tags: ["Autenticación"],
      requestBody: {
        description: "Credenciales de usuario",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput",
              example: {
                userlogin: "aasvdj@correo.com",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Inicio de sesión exitoso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
        400: {
          description: "Solicitud inválida",
        },
        401: {
          description: "Credenciales inválidas",
        },
        404: {
          description: "Usuario no encontrado",
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
  "/api/auth/register": {
    post: {
      summary: "Registrar un nuevo usuario",
      tags: ["Autenticación"],
      requestBody: {
        description: "Datos del usuario a registrar",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterInput",
              example: {
                username: "aasvdj",
                email: "aasvdj@correo.com",
                role: "Creator",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Registro exitoso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
        400: {
          description: "Errores de validación",
        },
        500: {
          description: "Error en el servidor",
        },
      },
    },
  },
};

export const schemaAuth = {
  LoginInput: {
    type: "object",
    properties: {
      userlogin: {
        type: "string",
      },
    },
    required: ["userlogin"],
  },
  RegisterInput: {
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
        enum: ["Reader", "Creator"],
      },
    },
    required: ["username", "email", "role"],
  },
  LoginResponse: {
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
      token: {
        type: "string",
      },
    },
  },
};
