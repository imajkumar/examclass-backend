"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/users/authController");
const validate_1 = require("../../middleware/validate");
const userSchema_1 = require("../../schemas/userSchema");
const deserializeUser_1 = require("../../middleware/deserializeUser");
const requireUser_1 = require("../../middleware/requireUser");
var router = express_1.default.Router();
router.post('/register', (0, validate_1.validate)(userSchema_1.createUserSchema), authController_1.registerUserHandler);
// Login user
router.post('/login', (0, validate_1.validate)(userSchema_1.loginUserSchema), authController_1.loginUserHandler);
// Logout user
router.get('/logout', deserializeUser_1.deserializeUser, requireUser_1.requireUser, authController_1.logoutHandler);
// Refresh access token
router.get('/refresh', authController_1.refreshAccessTokenHandler);
exports.default = router;
