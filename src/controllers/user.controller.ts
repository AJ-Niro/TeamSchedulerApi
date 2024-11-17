import { Request, Response } from 'express';
import { BaseController } from "./base.controller";

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get('', this.getUsers);
    this.router.post('', this.createUser);
  }

  private getUsers(req: Request, res: Response): void {
    res.send('List of users');
  }

  private createUser(req: Request, res: Response): void {
    res.send('User created');
  }
}