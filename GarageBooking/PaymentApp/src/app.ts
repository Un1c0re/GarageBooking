import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as swaggerUI from "swagger-ui-express";

import { logger } from "@/logger";
import { RegisterRoutes } from "@/routes";

import * as swaggerJson from "./swagger.json";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4001;

app.use(cors({ credentials: true, origin: "http://5.35.28.88:5173" }));
app.use(express.json());

RegisterRoutes(app);
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
