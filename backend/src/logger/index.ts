import { LoggerInterface } from './types';

class BackLogger implements LoggerInterface {
    log(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    error(message: string, error: any): void {
        console.error(`[ERROR] ${message}`, error);
    }
}

const backLogger = new BackLogger();
export default backLogger;