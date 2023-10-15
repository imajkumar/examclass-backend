"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/users/userController");
const deserializeUser_1 = require("../../middleware/deserializeUser");
const requireUser_1 = require("../../middleware/requireUser");
const router = express_1.default.Router();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// Get currently logged in user
router.get('/me', userController_1.getMeHandler);
router.post('/updateProfile', userController_1.updateUserHandler);
exports.default = router;
