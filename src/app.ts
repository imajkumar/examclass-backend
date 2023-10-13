require("dotenv").config();
import express, { NextFunction,Request, Response } from "express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import { corsOptions } from "./utils/corsOptions";

import { AppDataSource } from "./utils/data-source";
import AppError from "./utils/appError";
import validateEnv from "./utils/validateEnv";

import indexRouter from "./ routes/index";
import apiRouter  from './ routes/api';

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();
    console.log("Data Source has been initialized!");
    const app = express();
    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // Cross Origin Resource Sharing
    app.use(cors(corsOptions));

    // built-in middleware to handle urlencoded form data
    app.use(express.urlencoded({ extended: false }));
    // built-in middleware for json

    app.use(express.json({ limit: "10kb" }));
    //middleware for cookies

    app.use(cookieParser());
    //Route Prefixes
    app.use("/", indexRouter);
    app.use("/apiV1/", apiRouter);
    
    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response,next:NextFunction) => {
      res.send(new AppError(404, `Route ${req.originalUrl} not found`));
      next();
    }); 
    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>("port");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
