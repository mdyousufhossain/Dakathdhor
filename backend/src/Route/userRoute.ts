import express, { Router } from 'express';
import { HandleRegisterUser , HandlelogoutUser , HandleloginUser } from '../Controller/Users.Controller';

const router: Router = express.Router();

// Member register handler
router.post('/user/register', HandleRegisterUser);
router.post('/user/login', HandleloginUser);
router.post('/user/logout', HandlelogoutUser);

export default router;
