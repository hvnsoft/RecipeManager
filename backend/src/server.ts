import express from "express";
import compression from "compression";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import mainRouter from "./routes";
import { Config } from "./config";

class Server {
    
    protected app: any;
    protected server: any;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.setupRoutes();
        this.startServer();
    }

    configureMiddleware() {
        this.app.use(json());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(express.static("public"));
    }

    setupRoutes() {
        this.app.use("/api", mainRouter);
    }

    startServer() {
        this.server = this.app.listen(Config.port, () => {
            console.log(`Server is listening on port:${Config.port}`);
        });
    }
}

const server = new Server();
export default server;
