import express, { Router } from 'express';
import { HandleRegisterUser } from '../Controller/Users.Controller';

const router: Router = express.Router();

// Member register handler
router.post('/user/register', HandleRegisterUser);

export default router;
