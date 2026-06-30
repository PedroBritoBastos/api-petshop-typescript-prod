import { IPetshopServiceRepository } from "./IPetshopServiceRepository";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { prisma } from "../../../shared/prisma/prisma";
import { PetshopService } from "../../../generated/prisma/client";
import { UpdatePetshopServiceDTO } from "../dtos/UpdatePetshopServiceDTO";

export class PetshopServiceRepository implements IPetshopServiceRepository {
  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    const petshopService = await prisma.petshopService.create({ data });
    return petshopService;
  }

  async getAll(): Promise<PetshopService[]> {
    const petshopServices = await prisma.petshopService.findMany();
    return petshopServices;
  }

  async getById(id: string): Promise<PetshopService | null> {
    const petshopService = await prisma.petshopService.findUnique({
      where: { id },
    });
    return petshopService;
  }

  async deleteById(id: string): Promise<PetshopService> {
    const deletedPetshopService = await prisma.petshopService.delete({
      where: { id },
    });
    return deletedPetshopService;
  }

  async update(id: string, data: UpdatePetshopServiceDTO): Promise<PetshopService> {
    const updatedPetshopService = await prisma.petshopService.update({
      where: { id },
      data,
    });
    return updatedPetshopService;
  }

  async getByClientId(clientId: string): Promise<PetshopService[] | null> {
    return await prisma.petshopService.findMany({
      where: {
        clientId,
      },
    });
  }
}
