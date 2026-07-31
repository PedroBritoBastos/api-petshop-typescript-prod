import { PetshopService } from "../types/PetshopService";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { UpdatePetshopServiceDTO } from "../dtos/UpdatePetshopServiceDTO";

export interface IPetshopServiceRepository {
  create(data: CreatePetshopServiceDTO): Promise<PetshopService>;
  getAll(): Promise<PetshopService[]>;
  getById(id: string): Promise<PetshopService | null>;
  getByClientId(clientId: string): Promise<PetshopService[] | null>;
  deleteById(id: string): Promise<PetshopService | null>;
  update(id: string, data: UpdatePetshopServiceDTO): Promise<PetshopService | null>;
}
