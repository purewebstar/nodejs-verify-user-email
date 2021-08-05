/** importing dependencies */
import express from 'express'
import passport from 'passport'
/** importing controllers */
import {home, login, dashboard, signUp, verifyAccount, errorPage} from '../controllers/page.controller.js'
import { isAuthenticated} from '../middlewares/Authenticate.js'

const router = express.Router()

//GET HTTP
router.get('/', home)
router.get('/index', home)
router.get('/sign-in', login)
router.get('/dashboard', dashboard)
router.get('/sign-up', signUp)
router.get('/verify-account', verifyAccount)
router.get('/error', errorPage)

//POST HTTP

export default router