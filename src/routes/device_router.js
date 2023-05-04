import express from "express";
import deviceController from "../controller/device_controller.js"
import authMiddleware from "../utils/validate_token.js";

const deviceRouter = express.Router();

deviceRouter.get("/getData", authMiddleware, deviceController.getData);

export default deviceRouter