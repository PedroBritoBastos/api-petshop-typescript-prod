import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthControllerMiddleware } from "../middlewares/AuthControllerMiddleware";

export class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.post("/auth/login", AuthControllerMiddleware.validateData, AuthController.login);
    this.router.post("/auth/logout", AuthController.logout);
    this.router.get("/auth/get", AuthController.getLoggedClient);
  }
}
