import express from "express";
import deviceController from "../controller/device_controller.js";
import { checkAuth } from "../utils/handle_errors.js";

// Creamos una instancia del router de Express
const deviceRouter = express.Router();

// Definimos la ruta y el controlador asociado para la obtención de datos de dispositivos
deviceRouter.get("/getData", checkAuth, deviceController.getData);

export default deviceRouter;
