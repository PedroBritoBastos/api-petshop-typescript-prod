import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export class ClientController {
  constructor(private clientService: ClientService) {}

  async create(req: Request, res: Response): Promise<Response | undefined> {
    const { name, email, phone, password, cpf, role } = req.body;

    try {
      const result = await this.clientService.create(name, email, phone, password, cpf, role);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.clientService.getAll();

      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao buscar clientes",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id as string;
      const client = await this.clientService.getById(id);
      return res.status(200).json(client);
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao buscar cliente",
      });
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    try {
      await this.clientService.deleteById(id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro interno",
      });
    }
  }

  async uploadPhoto(req: Request, res: Response): Promise<Response | undefined> {
    const id = req.params.id as string;

    const file = req.file?.filename;

    if (!file) {
      return res.status(400).json({
        message: "Nenhuma imagem enviada",
      });
    }

    const data = {
      imageUrl: `/photos/users/${file}`,
    };

    try {
      await this.clientService.uploadPhoto(id, data);

      return res.status(200).json({
        message: "Foto adicionada com sucesso.",
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }
}
