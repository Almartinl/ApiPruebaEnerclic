import express from "express";
import deviceController from "../controller/device_controller.js"

const deviceRouter = express.Router();

deviceRouter.get("/getData", deviceController.getData);

export default deviceRouter