import express, { Router } from 'express'
import { handleGetUser } from '../Controller/Users.Controller'
//import rateLimit from 'express-rate-limit'
const router: Router = express.Router()

// single user detector
router.get('/user/getuser/:id', handleGetUser)

export default router
