import axios, { AxiosInstance } from 'axios';

interface CreateInstanceData {
    apiUrl: string;
}

type CreateInstance = (data: CreateInstanceData) => AxiosInstance;

const createInstance: CreateInstance = ({ apiUrl }): AxiosInstance => {
    const instance = axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return instance;
};

export { createInstance };