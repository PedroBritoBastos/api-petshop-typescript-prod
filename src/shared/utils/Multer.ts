import multer from "multer";
import path from "path";
import fs from "fs";

export class Multer {
  // retorna a pasta raiz do projeto e junta o caminho para fazer um caminho absoluto
  public uploadPath;

  constructor(url: string) {
    this.uploadPath = path.resolve(process.cwd(), url);
  }

  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // verifica se a pasta existe nesse caminho e cria a pasta caso nao exista
      if (!fs.existsSync(this.uploadPath)) {
        fs.mkdirSync(this.uploadPath, {
          recursive: true,
        });
      }
      cb(null, this.uploadPath);
    },

    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  });

  public upload = multer({
    storage: this.storage,

    limits: {
      fileSize: 5 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Formato de imagem inválido"));
      }

      cb(null, true);
    },
  });
}
