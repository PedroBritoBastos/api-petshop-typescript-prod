import { PetshopService } from "../../../generated/prisma/client";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { UpdatePetshopServiceDTO } from "../dtos/UpdatePetshopServiceDTO";

export interface IPetshopServiceRepository {
  create(data: CreatePetshopServiceDTO): Promise<PetshopService>;
  getAll(): Promise<PetshopService[]>;
  getById(id: string): Promise<PetshopService | null>;
  getByClientId(clientId: string): Promise<PetshopService[] | null>;
  deleteById(id: string): Promise<PetshopService>;
  update(id: string, data: UpdatePetshopServiceDTO): Promise<PetshopService>;
}
