import { Request, Response } from "express";
import { PetshopServiceService } from "../services/PetshopServiceService";

export class PetshopServiceController {
  constructor(private petshopServiceService: PetshopServiceService) {}

  async create(req: Request, res: Response): Promise<Response | undefined> {
    const { clientId, petId, type, executionDate } = req.body;

    try {
      const data = {
        clientId,
        petId,
        type,
        executionDate,
        finished: false,
      };

      const result = await this.petshopServiceService.create(data);

      return res.status(201).json({
        message: "Serviço criado.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const result = await this.petshopServiceService.getAll();

      return res.status(200).json({
        message: "Serviços.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<Response | undefined> {
    const id = req.params.id as string;

    try {
      const result = await this.petshopServiceService.deleteById(id);

      return res.status(200).json({
        message: "Serviço excluído.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    }
  }

  async finishService(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id as string;
      const data = req.body;
      const finishedPetshopService = await this.petshopServiceService.finishService(id, data);
      return res.status(200).json({ message: "Serviço finalizado com sucesso.", service: finishedPetshopService });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  }

  async getClientServices(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const clientId = req.params.clientId as string;
      const services = await this.petshopServiceService.getClientServices(clientId);
      return res.status(200).json({ message: "Serviços solicitados:", result: services });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  }
}
