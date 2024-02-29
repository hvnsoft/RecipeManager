export interface LoggerInterface {
    log(message: string): void;
    error(message: string, error: any): void;
}