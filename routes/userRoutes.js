import { Router } from 'express'
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateRoles,
} from '../controllers/userController.js'
import multer from 'multer'
import { uploadProfile } from '../controllers/uploadController.js'

const upload = multer()
const userRouter = Router()
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser)

//upload
userRouter.post('/upload/:id', upload.single('file'), uploadProfile)

//roles
userRouter.patch('/roles/:userId', updateRoles)

export default userRouter
