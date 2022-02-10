import Express, { Application } from "express";

class Server {
  port: number;
  app: Application;

  constructor(port: number) {
    this.port = port;
    this.init();
  }

  init() {
    this.app = Express();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server ready at http://localhost:${this.port}`);
    });
  }
}

export default Server;
