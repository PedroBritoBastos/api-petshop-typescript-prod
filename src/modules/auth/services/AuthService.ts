import { ClientRepository } from "../../client/repositories/ClientRepository";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { BcryptProvider } from "../../../shared/crypto/BcryptProvider";

/**
 * this class deals with login and regitering clients
 */
export class AuthService {
  constructor(private clientRepository: ClientRepository) {}

  async login(email: string, password: string) {
    // validando o email
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      throw new Error("Usuário não encontrado.");
    }

    // validando a senha
    const passwordValid = await BcryptProvider.compareHash(password, client.password);
    if (!passwordValid) throw new Error("Senha inválida.");

    // gerando um token de usuario
    const token = JwtProvider.generateToken({
      id: client.id,
      email: client.email,
      role: client.role,
    });

    return { clientId: client.id, token };
  }
}
