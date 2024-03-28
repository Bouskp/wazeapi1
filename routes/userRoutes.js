import { Router } from 'express'
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js'

const userRouter = Router()
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser)

export default userRouter
