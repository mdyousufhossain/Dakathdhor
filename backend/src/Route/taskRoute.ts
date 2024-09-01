import express, { Router } from 'express'
import { HandleTaskCreate, HandleTaskRetrieve } from '../Controller/Task.Controller'

const router: Router = express.Router()

router.post('/user/createtask', HandleTaskCreate)
router.get('/user/alltask', HandleTaskRetrieve)

export default router
