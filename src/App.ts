import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { ClientRoutes } from "./modules/client/routes/ClientRoutes";
import { AuthRoutes } from "./modules/auth/routes/AuthRoutes";
import { PetRoutes } from "./modules/pet/routes/PetRoutes";
import { PetshopServiceRoutes } from "./modules/petshopService/routes/PetshopServiceRoutes";

/**
 * this class configures the server
 */
export default class App {
  public app: Application;
  private clientRoutes: ClientRoutes = new ClientRoutes();
  private authRoutes: AuthRoutes = new AuthRoutes();
  private petRoutes: PetRoutes = new PetRoutes();
  private petshopServiceRoutes: PetshopServiceRoutes = new PetshopServiceRoutes();

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        origin: "http://localhost:4200",
        credentials: true,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.clientRoutes.router);
    this.app.use(this.authRoutes.router);
    this.app.use(this.petRoutes.router);
    this.app.use(this.petshopServiceRoutes.router);
    //  this.app.use("/photos", express.static(path.resolve("src/data/photos")));
    this.app.get("/", (req: Request, res: Response) => {
      return res.send("Hello World");
    });
  }
}
