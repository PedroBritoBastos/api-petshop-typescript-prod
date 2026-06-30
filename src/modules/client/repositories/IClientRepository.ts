import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { ClientResponseDTO } from "../dtos/ClientResponseDTO";

export interface IClientRepository {
  create(data: CreateClientDTO): Promise<ClientResponseDTO>;

  findByEmail(email: string): Promise<ClientResponseDTO | null>;

  findById(id: string): Promise<ClientResponseDTO | null>;

  update(id: string, data: UpdateClientDTO): Promise<ClientResponseDTO>;

  deleteById(id: string): Promise<void>;

  getAll(): Promise<ClientResponseDTO[]>;
}
