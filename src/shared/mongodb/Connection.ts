import mongoose from "mongoose";

export class Connection {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_DATABASE_URL as string);
      console.log("MongoDB conectado com sucesso.");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      throw error;
    }
  }
}
