import { Router } from 'express'
import UserController from '@app/controllers/user.controller'
import container from '@config/inversify.config'
import TYPES from '@config/inversify.types'

const userRouter = Router()
const userController = container.get<UserController>(TYPES.UserController)

userRouter.get('/', async (req, res) => {
  await userController.getAllUsers(req, res)
})

userRouter.post('/', async (req, res) => {
  await userController.createUser(req, res)
})

export default userRouter
