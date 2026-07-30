import App from "./App";
import { Connection } from "./shared/mongodb/Connection";

/**
 * this class starts the server
 */
export default class Server {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  // inicia o servidor
  public async start(): Promise<void> {
    try {
      // tenta conectar ao banco
      await Connection.connect();

      // roda o servidor
      const appInstance = new App();
      appInstance.app.listen(this.port, () => {
        console.log(`Server rodando na porta ${this.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
