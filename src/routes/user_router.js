import express from "express";
import userController from "../controller/user_controller.js";
import validateLoginDto from "../utils/validate_login_dto.js";


const userRouter = express.Router();


userRouter.post("/createUser", userController.createUser);

userRouter.post("/login", validateLoginDto, userController.loginUser);


export default userRouter;
