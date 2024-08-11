import express, { Router } from 'express';
import { Request, Response } from 'express';
import { HandleRegisterUser } from '../Controller/Users.Controller';

const router: Router = express.Router();

// Member register handler
router.post('/user/register', (req: Request, res: Response) => HandleRegisterUser(req, res));

export default router;
