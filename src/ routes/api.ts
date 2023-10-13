import express from "express";
import authRouter from "./userRoutes/authRouter";
import userRouter from "./userRoutes/userRoutes";



const app = express();

app.use("/auth/", authRouter);
app.use("/users/", userRouter);


export default app;
