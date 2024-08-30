import express, { Router } from 'express'
import {
  HandleRegisterUser,
  HandlelogoutUser,
  HandleloginUser,
  handleCheckAvailityUsername,
  handleCheckAvailityEmail,
  handleGetUser,
} from '../Controller/Users.Controller'

const router: Router = express.Router()

// Member register handler

router.get('/user/username', handleCheckAvailityUsername)
router.get('/user/email', handleCheckAvailityEmail)

router.post('/user/register', HandleRegisterUser)
router.post('/user/login', HandleloginUser)
router.post('/user/logout', HandlelogoutUser)

export default router
