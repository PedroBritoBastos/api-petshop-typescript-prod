import { Router } from "express";

import { PetController } from "../controllers/PetController";

import { PetMiddleware } from "../middlewares/PetMiddleware";

import { PetService } from "../services/PetService";

import { ImageService } from "../../image/services/ImageService";

import { PetRepository } from "../repositories/PetRepository";

import { Multer } from "../../../shared/utils/Multer";

export class PetRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initialize();
  }

  private initialize() {
    // repository
    const petRepository = new PetRepository();

    // service
    const petService = new PetService(petRepository);
    const imageService = new ImageService();

    // controller
    const petController = new PetController(petService, imageService);

    // pegar todos os pets no painel de admin
    this.router.get("/pets", PetMiddleware.verifyIfIsAdmin, petController.getAll.bind(petController));

    // pegar todos os pets disponiveis para adocao
    this.router.get("/pets/available", petController.getAvailablePets.bind(petController));

    // pegar todos os pets adotados no painel de admin
    this.router.get("/pets/adopted", PetMiddleware.verifyIfIsAdmin, petController.getAdoptedPets.bind(petController));

    // pegar todos os pets adotados pelo cliente
    this.router.get("/pets/adopted/:clientId", PetMiddleware.verifyIfClientIsLogged, petController.getAdoptedPetsByClientId.bind(petController));

    // pegar o pet solicitado pelo cliente
    this.router.get("/pets/:petId", PetMiddleware.verifyIfClientIsLogged, petController.getPetById.bind(petController));

    // criar pet
    this.router.post(
      "/pets",
      PetMiddleware.verifyIfClientIsLogged,
      new Multer("src/data/photos/pets").upload.single("photo"),
      PetMiddleware.validateData,
      PetMiddleware.validadePhotoData,
      petController.create.bind(petController),
    );

    // deletar pet
    this.router.delete("/pets/:id", PetMiddleware.verifyIfClientIsLogged, petController.deleteById.bind(petController));

    // atualizar pet
    this.router.put("/pets/:id", PetMiddleware.verifyIfClientIsLogged, petController.update.bind(petController));

    // solicitar adocao de pet
    this.router.put("/pets/:id/adoption-request", PetMiddleware.verifyIfClientIsLogged, petController.requestAdoption.bind(petController));

    // adotar pet
    this.router.put("/pets/adoption/:id", PetMiddleware.verifyIfClientIsLogged, petController.adopt.bind(petController));

    // enviar foto do pet
    this.router.post("/pets/upload/:id", new Multer("src/data/photos/pets").upload.single("petPhoto"), PetMiddleware.validadePhotoData, petController.uploadPhoto.bind(petController));
  }
}
