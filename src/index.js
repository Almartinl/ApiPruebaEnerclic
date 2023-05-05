import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user_router.js";
import deviceRouter from "./routes/device_router.js";

// Cargamos las variables de entorno del archivo .env
dotenv.config();

// Creamos la instancia de Express
const app = express();
// Creamos una instancia de Router para manejar las rutas
const routes = express.Router();

//Middleware de express
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use("/api", routes);

// Rutas para manejar los endpoints relacionados con usuarios y dispositivos
routes.use("/user", userRouter);
routes.use("/device", deviceRouter);

export default app;
