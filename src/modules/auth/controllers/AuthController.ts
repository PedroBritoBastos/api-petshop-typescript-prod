import { ClientRepository } from "../../client/repositories/ClientRepository";
import { AuthService } from "../services/AuthService";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { Request, Response } from "express";

export class AuthController {
  private static authService = new AuthService(new ClientRepository());

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await AuthController.authService.login(email, password);

      // inserindo o token no cookie
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      });

      return res.status(200).json({
        message: "Usuário logado",
        clientId: result.clientId,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  // limpa os cookies para fazer o logout do cliente
  static async logout(req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logout realizado." });
  }

  // pega o token dos cookies e retorna o payload com os dados do cliente logado
  static async getLoggedClient(req: Request, res: Response) {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Não autenticado",
      });
    }

    const payload = JwtProvider.verifyToken(token);
    return res.status(200).json({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });
  }
}
