import { PetshopService } from "../../../generated/prisma/client";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { PetshopServiceRepository } from "../repositories/PetshopServiceRepository";
import { UpdatePetshopServiceDTO } from "../dtos/UpdatePetshopServiceDTO";

export class PetshopServiceService {
  constructor(private petshopServiceRepository: PetshopServiceRepository) {}

  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    return await this.petshopServiceRepository.create(data);
  }

  async getAll(): Promise<PetshopService[]> {
    return await this.petshopServiceRepository.getAll();
  }

  async deleteById(id: string): Promise<PetshopService> {
    const petshopService = await this.petshopServiceRepository.getById(id);

    if (!petshopService) {
      throw new Error("Serviço não encontrado.");
    }

    return await this.petshopServiceRepository.deleteById(id);
  }

  async finishService(id: string, data: UpdatePetshopServiceDTO): Promise<PetshopService> {
    const petshopService = await this.petshopServiceRepository.getById(id);
    if (!petshopService) throw new Error("Serviço não encontrado.");
    return await this.petshopServiceRepository.update(id, data);
  }

  async getClientServices(clientId: string): Promise<PetshopService[] | null> {
    return await this.petshopServiceRepository.getByClientId(clientId);
  }
}
