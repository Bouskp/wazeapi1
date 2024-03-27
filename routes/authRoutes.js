import { Router } from 'express'
import { login, logout, register } from '../controllers/authController.js'

const authRouter = Router()
authRouter.get('/login', login)
authRouter.post('/register', register)
authRouter.get('/logout', logout)

export default authRouter
