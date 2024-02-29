import { configDotenv } from "dotenv";
configDotenv();

export class Config {
    static get appName() {
        return process.env.APP_NAME;
    }

    static get port() {
        return process.env.PORT;
    }

    static get dbUrl() {
        return process.env.DB_URL;
    }
}
