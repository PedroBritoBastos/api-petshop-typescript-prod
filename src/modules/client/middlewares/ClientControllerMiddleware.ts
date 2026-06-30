import { Request, Response, NextFunction } from "express";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { TokenPayload } from "../types/TokenPayload";
import { body, validationResult } from "express-validator";

export class ClientControllerMiddleware {
  public static validateData = [
    body("name").notEmpty().withMessage("O nome é obrigatório."),
    body("email").notEmpty().withMessage("O email é obrigatório.").isEmail().withMessage("Email inválido."),
    body("cpf").notEmpty().withMessage("O CPF é obrigatório."),
    body("password")
      .notEmpty()
      .withMessage("A senha é obrigatória.")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      next();
    },
  ];

  public static validadePhotoData(req: Request, res: Response, next: NextFunction) {
    const file = req.file?.filename;
    if (!file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada." });
    }

    return next();
  }

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      // recuperando o token do cookie
      const token = JwtProvider.getClientToken(req);

      // decodificando o token
      const decoded = JwtProvider.verifyToken(token) as TokenPayload;

      // verificando se o usuário é o mesmo que está querendo acessar o recurso
      const id = req.params.id as string;

      if (id && id !== decoded.id) {
        return res.status(403).json({
          message: "Sem autorização",
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Token inválido ou não fornecido",
      });
    }
  }
}
