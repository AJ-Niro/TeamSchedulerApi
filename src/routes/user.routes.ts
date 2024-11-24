import { Router } from 'express'
import UserController from '../app/controllers/user.controller'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', async (req, res) => {
  await userController.getAllUsers(req, res)
})

userRoutes.post('/', async (req, res) => {
  await userController.createUser(req, res)
})

export default userRoutes
