import express from "express";
import userController from "../controller/user_controller.js";
import validateLoginDto from "../utils/validate_login_dto.js";

// Crear una nueva instancia del enrutador
const userRouter = express.Router();

// Ruta para crear un nuevo usuario
userRouter.post("/createUser", userController.createUser);

// Ruta para iniciar sesión
userRouter.post("/login", validateLoginDto, userController.loginUser);

// Exportar el enrutador
export default userRouter;
