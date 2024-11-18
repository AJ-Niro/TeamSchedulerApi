import { Request, Response } from 'express';
import { BaseController } from "./base.controller";

export default class UserController extends BaseController {

  protected initializeRoutes(): void {
    this.router.get('', (req, res) => this.getUsers(req, res));
    this.router.post('', (req, res) => this.createUser(req, res));
  }

  private getUsers(req: Request, res: Response): void {
    res.send('List of users');
  }

  private createUser(req: Request, res: Response): void {
    res.send('User created');
  }
}