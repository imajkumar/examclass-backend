"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./userRoutes/authRouter"));
const userRoutes_1 = __importDefault(require("./userRoutes/userRoutes"));
const app = (0, express_1.default)();
app.use("/auth/", authRouter_1.default);
app.use("/users/", userRoutes_1.default);
exports.default = app;
