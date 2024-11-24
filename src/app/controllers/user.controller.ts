import { Request, Response } from 'express'
import { UserService } from '@app/services/user.service'
import UserEntity from '@database/entities/user.entity'

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers()
    return res.json(users)
  }

  async createUser(
    req: Request<unknown, unknown, { name: string }>,
    res: Response,
  ) {
    const userNewRecord = new UserEntity()
    userNewRecord.name = req.body.name
    const user = await this.userService.createUser(userNewRecord)
    return res.status(201).json(user)
  }
}
