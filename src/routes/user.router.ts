import { Router } from 'express'
import UserController from '@app/controllers/user.controller'

const userRouter = Router()
const userController = new UserController()

userRouter.get('/', async (req, res) => {
  await userController.getAllUsers(req, res)
})

userRouter.post('/', async (req, res) => {
  await userController.createUser(req, res)
})

export default userRouter
