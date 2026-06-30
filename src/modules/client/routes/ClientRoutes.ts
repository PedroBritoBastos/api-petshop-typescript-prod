import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { ClientControllerMiddleware } from "../middlewares/ClientControllerMiddleware";
import { ClientService } from "../services/ClientService";
import { ClientRepository } from "../repositories/ClientRepository";
import { Multer } from "../../../shared/utils/Multer";

export class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    // repository
    const clientRepository = new ClientRepository();

    // service
    const clientService = new ClientService(clientRepository);

    // controller
    const clientController = new ClientController(clientService);

    this.router.get("/clients", clientController.getAll.bind(clientController));

    this.router.get("/clients/:id", ClientControllerMiddleware.validateToken, clientController.getById.bind(clientController));

    this.router.post("/clients", ClientControllerMiddleware.validateData, clientController.create.bind(clientController));

    this.router.delete("/clients/:id", ClientControllerMiddleware.validateToken, clientController.deleteById.bind(clientController));

    this.router.post(
      "/clients/upload/:id",
      new Multer("src/data/photos/users").upload.single("clientPhoto"),
      ClientControllerMiddleware.validateToken,
      ClientControllerMiddleware.validadePhotoData,
      clientController.uploadPhoto.bind(clientController),
    );
  }
}
