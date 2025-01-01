import { injectable, inject } from 'inversify'
import TYPES from '@config/inversify.types'
import { Request, Response } from 'express'
import { UserService } from '@app/services/user.service'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { CreateUserDTO } from '@app/dtos/user.dto'

@injectable()
export default class UserController {
  private userService: UserService

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers()
    return res.status(200).json(users)
  }

  async createUser(
    req: Request<unknown, unknown, { name: string }>,
    res: Response,
  ) {
    const createUserInstance = plainToInstance(CreateUserDTO, req.body)
    const errors: ValidationError[] = await validate(createUserInstance)

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints ?? {}))
        .flat()
      return res
        .status(400)
        .json({ message: 'Validation failed', errors: errorMessages })
    }

    const user = await this.userService.createUser(createUserInstance)
    return res.status(201).json(user)
  }
}
