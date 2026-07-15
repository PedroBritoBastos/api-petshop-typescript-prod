import cloudinary from "../config/cloudinary";
import fs from "node:fs/promises";

export class ImageService {
  public async upload(filePath: string, folder: string = "pets"): Promise<string> {
    try {
      // faz upload e retorna a url da imagem salva
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
      });
      await fs.unlink(filePath);
      return result.secure_url;
    } catch (error) {
      await fs.unlink(filePath).catch(() => {});
      throw error;
    }
  }
}
