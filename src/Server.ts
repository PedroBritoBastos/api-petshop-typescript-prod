import App from "./App";

/**
 * this class starts the server
 */
export default class Server {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  public start(): void {
    const appInstance = new App();
    appInstance.app.listen(this.port, () => {
      console.log(`Server rodando na porta ${this.port}`);
    });
  }
}
