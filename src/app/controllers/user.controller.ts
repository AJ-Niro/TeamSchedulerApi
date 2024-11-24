import { Request, Response } from 'express'

export default class UserController {
  public getAllUsers(req: Request, res: Response): void {
    res.send('List of users')
  }

  public createUser(req: Request, res: Response): void {
    res.send('User created')
  }
}
