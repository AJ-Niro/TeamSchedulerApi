import { Router } from 'express';

export abstract class BaseController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}
