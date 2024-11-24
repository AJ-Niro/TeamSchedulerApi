import { Router } from 'express'
import UserController from '../app/controllers/user.controller'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/', (req, res) => userController.getAllUsers(req, res))
userRoutes.post('/', (req, res) => userController.createUser(req, res))

export default userRoutes
