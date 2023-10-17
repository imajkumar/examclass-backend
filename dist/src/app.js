"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const corsOptions_1 = require("./utils/corsOptions");
const data_source_1 = require("./utils/data-source");
const appError_1 = __importDefault(require("./utils/appError"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const index_1 = __importDefault(require("./ routes/index"));
const api_1 = __importDefault(require("./ routes/api"));
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // VALIDATE ENV
    (0, validateEnv_1.default)();
    console.log("Data Source has been initialized!");
    const app = (0, express_1.default)();
    // 2. Logger
    if (process.env.NODE_ENV === "development")
        app.use((0, morgan_1.default)("dev"));
    // Cross Origin Resource Sharing
    app.use((0, cors_1.default)(corsOptions_1.corsOptions));
    // built-in middleware to handle urlencoded form data
    app.use(express_1.default.urlencoded({ extended: false }));
    // built-in middleware for json
    app.use(express_1.default.json({ limit: "10kb" }));
    //middleware for cookies
    app.use((0, cookie_parser_1.default)());
    //Route Prefixes
    app.use("/", index_1.default);
    app.use("/apiV1/", api_1.default);
    // UNHANDLED ROUTE
    app.all("*", (req, res, next) => {
        res.send(new appError_1.default(404, `Route ${req.originalUrl} not found`));
        next();
    });
    // GLOBAL ERROR HANDLER
    app.use((error, req, res, next) => {
        error.status = error.status || "error";
        error.statusCode = error.statusCode || 500;
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    });
    const port = config_1.default.get("port");
    const HOST = '0.0.0.0';
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}))
    .catch((error) => console.log(error));
