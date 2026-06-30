import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { ClientResponseDTO } from "../dtos/ClientResponseDTO";
import { IClientRepository } from "./IClientRepository";
import { prisma } from "../../../shared/prisma/prisma";

export class ClientRepository implements IClientRepository {
  async getAll(): Promise<ClientResponseDTO[]> {
    return await prisma.client.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        imageUrl: true,
      },
    });
  }

  async create(data: CreateClientDTO): Promise<ClientResponseDTO> {
    return await prisma.client.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        imageUrl: true,
      },
    });
  }

  async findByEmail(email: string): Promise<any | null> {
    return await prisma.client.findFirst({ where: { email } });
  }

  async findById(id: string): Promise<ClientResponseDTO | null> {
    return await prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        imageUrl: true,
      },
    });
  }

  async update(id: string, data: UpdateClientDTO): Promise<ClientResponseDTO> {
    return await prisma.client.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        imageUrl: true,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.client.delete({
      where: { id },
    });
  }
}
