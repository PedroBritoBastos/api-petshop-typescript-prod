import { Request, Response, NextFunction } from "express";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { TokenPayload } from "../../client/types/TokenPayload";

export class PetMiddleware {
  public static async verifyIfIsAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtProvider.getClientToken(req);
      const decoded = JwtProvider.verifyToken(token) as TokenPayload;

      if (decoded.role !== "admin") {
        return res.status(403).json({
          message: "Acesso negado.",
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }
  }

  public static async verifyIfClientIsLogged(req: Request, res: Response, next: NextFunction) {
    try {
      const token = JwtProvider.getClientToken(req);
      const decoded = JwtProvider.verifyToken(token) as TokenPayload;
      (req as any).user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }
  }

  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { name, age, weight } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório." });
    }

    if (!age) {
      return res.status(400).json({ message: "A idade é obrigatória." });
    }

    if (!weight) {
      return res.status(400).json({ message: "O peso é obrigatório." });
    }

    return next();
  }

  public static validadePhotoData(req: Request, res: Response, next: NextFunction) {
    const file = req.file?.filename;
    if (!file) {
      return res.status(400).json({ message: "Foto não enviada." });
    }
    return next();
  }
}
