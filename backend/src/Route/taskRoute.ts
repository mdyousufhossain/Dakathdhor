import express, { Router } from 'express'
import { HandleTaskCreate } from '../Controller/Task.Controller'

const router: Router = express.Router()

router.post('/user/createtask', HandleTaskCreate)

export default router
