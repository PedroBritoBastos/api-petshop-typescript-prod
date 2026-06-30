import jwt from "jsonwebtoken";
import { Request } from "express";
import { TokenPayload } from "../../modules/client/types/TokenPayload";
import "dotenv/config";

/**
 * this class generates a jwt
 */
export class JwtProvider {
  private static secret = process.env.JWT_SECRET;

  public static generateToken(payload: object): string {
    if (!JwtProvider.secret) throw new Error("Não há secret.");

    return jwt.sign(payload, JwtProvider.secret, {
      expiresIn: "1h",
    });
  }

  public static verifyToken(token: string): any {
    if (!this.secret) throw new Error("Não há secret.");
    return jwt.verify(token, this.secret);
  }

  public static getClientToken(req: Request): string {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token não fornecido.");
    }
    return token;
  }

  public static getLoggedClient(req: Request): any {
    const token = req.cookies.token;
    const decoded = JwtProvider.verifyToken(token) as TokenPayload;
    return decoded;
  }
}
