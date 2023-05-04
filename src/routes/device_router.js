import express from "express";
import deviceController from "../controller/device_controller.js"

// Creamos una instancia del router de Express
const deviceRouter = express.Router();

// Definimos la ruta y el controlador asociado para la obtención de datos de dispositivos
deviceRouter.get("/getData", deviceController.getData);

// Exportamos el router para su uso en otros archivos
export default deviceRouter;
