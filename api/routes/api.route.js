/** importing dependencies */
import express from 'express'

/** importing controllers */
import {createUser, readUser, verifyUser} from '../controllers/api.controller.js'

const router = express.Router()

//GET HTTP
router.get('/verify-user/:token', verifyUser)

// POST HTTP
router.post('/create-user', createUser)
router.post('/read-user', readUser)

export default router