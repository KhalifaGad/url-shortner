import express, { Application } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { router } from "./routes";

class Server {
  port: number;
  app: Application;

  constructor(port: number) {
    this.port = port;
    this.init();
  }

  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(errorMiddleware);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server ready at http://localhost:${this.port}`);
    });
  }
}

export default Server;
