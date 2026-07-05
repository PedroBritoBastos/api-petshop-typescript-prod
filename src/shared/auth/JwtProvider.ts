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
    return jwt.sign(payload, JwtProvider.secret as string, {
      expiresIn: "1h",
    });
  }

  public static verifyToken(token: string): any {
    return jwt.verify(token, this.secret as string);
  }

  public static getClientToken(req: Request): string {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token não fornecido.");
    }
    return token;
  }

  public static getLoggedClientId(req: Request): any {
    const token = req.cookies.token;
    const decoded = JwtProvider.verifyToken(token) as TokenPayload;
    return decoded.id;
  }
}
