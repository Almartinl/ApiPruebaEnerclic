// Importamos los módulos necesarios
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

// Middleware para permitir solicitudes de cualquier origen
app.use(cors());
// Middleware para procesar solicitudes en formato JSON
app.use(express.json());
// Middleware para procesar solicitudes de texto
app.use(express.text());
// Middleware para procesar cookies
app.use(cookieParser());
// Middleware para montar las rutas en el prefijo "/api"
app.use("/api",routes)

// Rutas para manejar los endpoints relacionados con usuarios y dispositivos
routes.use("/user", userRouter);
routes.use("/device", deviceRouter)

// Exportamos la instancia de la aplicación
export default app;