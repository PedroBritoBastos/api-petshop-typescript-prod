import "dotenv/config";
import fs from "node:fs/promises";

export class ImageService {
  API = process.env.CLOUDINARY_API_URL as string;

  private async transformToFileFormat(photo: Express.Multer.File): Promise<File> {
    const buffer = await fs.readFile(photo.path);
    const photoFile = new File([buffer], photo.originalname, {
      type: photo.mimetype,
    });
    return photoFile;
  }

  public async uploadPetPhoto(photo: Express.Multer.File): Promise<string> {
    try {
      // transforma a foto para formato File antes de enviar para api do cloudinary
      const photoFile: File = await this.transformToFileFormat(photo);

      // cria formData com a foto no formato File e as configs necessarias para api do cloudinary
      const formData = new FormData();
      formData.append("file", photoFile);
      formData.append("upload_preset", "petshop-api-preset");

      // envia o formData para o cloudinary
      const response = await fetch(this.API, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(json));
      }

      return json.secure_url;
    } catch (error) {
      throw error;
    }
  }

  public async uploadClientPhoto(photo: Express.Multer.File): Promise<string> {
    try {
      // transforma a foto para formato File antes de enviar para api do cloudinary
      const photoFile: File = await this.transformToFileFormat(photo);

      // cria formData com a foto no formato File e as configs necessarias para api do cloudinary
      const formData = new FormData();
      formData.append("file", photoFile);
      formData.append("upload_preset", "petshop-api-preset-clients");

      // envia o formData para o cloudinary
      const response = await fetch(this.API, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(json));
      }

      return json.secure_url;
    } catch (error) {
      throw error;
    }
  }
}
