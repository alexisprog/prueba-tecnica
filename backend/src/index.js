import express from "express";
import swaggerUi from "swagger-ui-express";

import { connect } from "./config/db.js";
import swaggerDocument from "./swagger/swagger.js";

// routers
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import topicRouter from "./routes/topic.routes.js";
import contentRouter from "./routes/content.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/topics", topicRouter);
app.use("/api/contents", contentRouter);

// Conexión a la base de datos y inicio del servidor
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor", error);
  });
