import { describe, test, expect } from "@jest/globals";
import { ClientController } from "../controllers/ClientController";
import { CreateClientDTO } from "../dtos/CreateClientDTO";

describe("Testando ClientController", () => {
  const clientController: ClientController = new ClientController();

  const clientDTO: CreateClientDTO = {
    name: "Pedro",
    email: "pedro@email.com",
    phone: "1234564",
    cpf: "23030449",
  };

  // testando se um Client está sendo criado
});
