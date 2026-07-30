import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { ClientResponseDTO } from "../dtos/ClientResponseDTO";
import { LoginClientDTO } from "../dtos/LoginClientDTO";

export interface IClientRepository {
  create(data: CreateClientDTO): Promise<ClientResponseDTO>;

  findByEmail(email: string): Promise<LoginClientDTO | null>;

  findById(id: string): Promise<ClientResponseDTO | null>;

  update(id: string, data: UpdateClientDTO): Promise<ClientResponseDTO | null>;

  deleteById(id: string): Promise<void>;

  getAll(): Promise<ClientResponseDTO[]>;
}
