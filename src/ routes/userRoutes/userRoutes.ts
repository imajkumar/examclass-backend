import express from 'express';
import { getMeHandler,updateUserHandler } from '../../controllers/users/userController'
import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../middleware/requireUser'

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);
router.post('/updateProfile', updateUserHandler);


export default router;