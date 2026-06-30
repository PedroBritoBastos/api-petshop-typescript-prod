import { Router } from "express";
import { PetshopServiceController } from "../controllers/PetshopServiceController";
import { PetshopServiceMiddleware } from "../middlewares/PetshopServiceMiddleware";
import { PetshopServiceService } from "../services/PetshopServiceService";
import { PetshopServiceRepository } from "../repositories/PetshopServiceRepository";

export class PetshopServiceRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    // repository
    const petshopServiceRepository = new PetshopServiceRepository();

    // service
    const petshopServiceService = new PetshopServiceService(petshopServiceRepository);

    // controller
    const petshopServiceController = new PetshopServiceController(petshopServiceService);

    this.router.post("/petshopServices", PetshopServiceMiddleware.validateData, petshopServiceController.create.bind(petshopServiceController));

    this.router.get("/petshopServices", petshopServiceController.getAll.bind(petshopServiceController));

    this.router.get("/petshopServices/:clientId", petshopServiceController.getClientServices.bind(petshopServiceController));

    this.router.delete("/petshopServices/:id", petshopServiceController.delete.bind(petshopServiceController));

    this.router.put("/petshopServices/:id", PetshopServiceMiddleware.validateUpdateData, petshopServiceController.finishService.bind(petshopServiceController));
  }
}
