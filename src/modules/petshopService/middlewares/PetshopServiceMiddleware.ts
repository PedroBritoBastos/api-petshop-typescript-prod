import { Request, Response, NextFunction } from "express";

export class PetshopServiceMiddleware {
  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { clientId, petId, type, executionDate } = req.body;

    if (!clientId) {
      return res.status(400).json({ message: "Sem id do cliente." });
    }

    if (!petId) {
      return res.status(400).json({ message: "Sem id do pet." });
    }

    if (!type) {
      return res.status(400).json({ message: "O tipo de serviço é obrigatório." });
    }

    if (!executionDate) {
      return res.status(400).json({ message: "A data de execução é obrigatória." });
    }

    return next();
  }

  public static validateUpdateData(req: Request, res: Response, next: NextFunction) {
    const { finished } = req.body;
    if (!finished) {
      return res.status(400).json({ message: "Nenhum serviço finalizado." });
    }
    return next();
  }
}
