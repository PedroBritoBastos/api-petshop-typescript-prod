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
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
      });

      return res.status(200).json({
        message: "Usuário logado",
        client: result.client,
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
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logout realizado." });
  }

  // pega o token dos cookies e retorna o payload com os dados do cliente logado
  static async getLoggedClient(req: Request, res: Response) {
    try {
      // verifica se o cliente está autenticado
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "Não autenticado",
        });
      }

      // pega os dados do cliente logado e verifica se é admin
      const payload = JwtProvider.verifyToken(token);
      const isAdmin = await AuthController.authService.verifyIfLoggedClientIsAdmin(payload);

      return res.status(200).json({ result: isAdmin });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  }

  // verifica se o cliente logado é admin
  static async verifyIfLoggedClientIsAdmin(req: Request, res: Response) {
    try {
      // verifica se o cliente está autenticado
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "Não autenticado",
        });
      }

      // pega os dados do cliente logado
      const payload = JwtProvider.verifyToken(token);
      const client = await AuthController.authService.getLoggedClientById(payload.id);

      return res.status(200).json({ result: client });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      }
    }
  }
}
