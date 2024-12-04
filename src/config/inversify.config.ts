// import 'reflect-metadata';
import { Container } from 'inversify'
import TYPES from './inversify.types'

import UserController from '@app/controllers/user.controller'
import { UserService } from '@app/services/user.service'
import { UserRepository } from '@app/repositories/user.repository'

const container = new Container()

container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)

export default container
