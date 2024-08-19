import express, { Router } from 'express'
import {
  handleGetUser,
} from '../Controller/Users.Controller'

const router: Router = express.Router()

// single user detector 
router.get('/user/getuser',handleGetUser)

export default router