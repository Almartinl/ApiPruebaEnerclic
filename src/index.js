import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user_router.js";
import deviceRouter from "./routes/device_router.js";


dotenv.config();

const app = express();
const routes = express.Router();


// middlware express
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use("/api",routes)

routes.use("/user", userRouter);
routes.use("/device", deviceRouter)


export default app