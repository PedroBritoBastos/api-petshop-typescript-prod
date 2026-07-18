import "dotenv/config";

export class ImageService {
  API = process.env.CLOUDINARY_API_URL as string;

  public async upload(photo: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "petshop-api-preset");

      const response = await fetch(this.API, {
        method: "POST",
        body: formData,
      });

      const responseJson = await response.json();
      return responseJson.secure_url;
    } catch (error) {
      throw error;
    }
  }
}
