import { ClientRepository } from "../repositories/ClientRepository";
import { BcryptProvider } from "../../../shared/crypto/BcryptProvider";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(name: string, email: string, phone: string, password: string, cpf: string, role: string) {
    const client = await this.clientRepository.findByEmail(email);

    if (client) {
      throw new Error("Esse usuário já existe");
    }

    const hashedPassword = await BcryptProvider.generateHash(password);

    if (!role) {
      role = "user";
    }

    const createdClient = await this.clientRepository.create({
      name,
      email,
      phone,
      cpf,
      password: hashedPassword,
      role,
    });

    const token = JwtProvider.generateToken({
      id: createdClient.id,
      email: createdClient.email,
    });

    return {
      createdClient,
      token,
    };
  }

  async getAll() {
    return this.clientRepository.getAll();
  }

  async deleteById(id: string) {
    return this.clientRepository.deleteById(id);
  }

  async uploadPhoto(id: string, data: UpdateClientDTO) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new Error("O cliente não existe");
    }

    return await this.clientRepository.update(id, data);
  }

  async getById(id: string) {
    return await this.clientRepository.findById(id);
  }
}
