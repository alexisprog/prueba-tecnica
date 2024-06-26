import express from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import cors from "cors";

import { connect } from "./config/db.js";
import swaggerDocument from "./swagger/swagger.js";

// routers
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import topicRouter from "./routes/topic.routes.js";
import contentRouter from "./routes/content.routes.js";
import authRouter from "./routes/auth.routes.js";

import { initData } from "./helpers/init.data.js";

dotenv.config();
const port = process.env.PORT || "4000";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("images"));
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
      initData();
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor", error);
  });
