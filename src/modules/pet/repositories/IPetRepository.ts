import { Pet } from "../types/Pet";
import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { UpdatePetDTO } from "../dtos/UpdatePetDTO";

export interface IPetRepository {
  create(data: CreatePetDTO): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByIsAdopted(): Promise<Pet[] | null>;
  findByNotAdopted(): Promise<Pet[] | null>;
  findByIsAdoptedByClientId(clientId: string): Promise<Pet[] | null>;
  deleteById(id: string): Promise<Pet | null>;
  getAll(): Promise<Pet[]>;
  update(id: string, data: UpdatePetDTO): Promise<Pet | null>;
}
