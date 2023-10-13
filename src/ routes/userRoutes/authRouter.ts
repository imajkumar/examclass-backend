import express from "express";
import { loginUserHandler, logoutHandler, refreshAccessTokenHandler, registerUserHandler } from "../../controllers/users/authController";
import { validate } from '../../middleware/validate'

import { createUserSchema, loginUserSchema } from '../../schemas/userSchema';
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireUser } from "../../middleware/requireUser";

var router = express.Router();

router.post('/register', validate(createUserSchema), registerUserHandler);

// Login user
router.post('/login', validate(loginUserSchema), loginUserHandler);

// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// Refresh access token
router.get('/refresh', refreshAccessTokenHandler);


export default router;
