import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { ClientResponseDTO } from "../dtos/ClientResponseDTO";
import { IClientRepository } from "./IClientRepository";
import { ClientModel } from "../models/Client";

export class ClientRepository implements IClientRepository {
  async getAll(): Promise<ClientResponseDTO[]> {
    const clients = await ClientModel.find(
      {},
      {
        name: 1,
        email: 1,
        phone: 1,
        cpf: 1,
        imageUrl: 1,
      },
    ).lean();

    return clients.map((client) => ({
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
      imageUrl: client.imageUrl as string,
    }));
  }

  async create(data: CreateClientDTO): Promise<ClientResponseDTO> {
    const client = await ClientModel.create(data);

    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
      imageUrl: client.imageUrl as string,
    };
  }

  async findByEmail(email: string): Promise<ClientResponseDTO | null> {
    const client = await ClientModel.findOne({ email }).lean();

    if (!client) return null;

    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
      imageUrl: client.imageUrl as string,
    };
  }

  async findById(id: string): Promise<ClientResponseDTO | null> {
    const client = await ClientModel.findById(id, {
      name: 1,
      email: 1,
      phone: 1,
      cpf: 1,
      imageUrl: 1,
    }).lean();

    if (!client) return null;

    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
      imageUrl: client.imageUrl as string,
    };
  }

  async update(id: string, data: UpdateClientDTO): Promise<ClientResponseDTO | null> {
    const client = await ClientModel.findByIdAndUpdate(id, data, {
      new: true,
      projection: {
        name: 1,
        email: 1,
        phone: 1,
        cpf: 1,
        imageUrl: 1,
      },
    }).lean();

    if (!client) return null;

    return {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      cpf: client.cpf,
      imageUrl: client.imageUrl as string,
    };
  }

  async deleteById(id: string): Promise<void> {
    await ClientModel.findByIdAndDelete(id);
  }
}
