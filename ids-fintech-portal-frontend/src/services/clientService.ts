import api from "./api";
import type { Client } from "../types/Client";

export const getAllClients = async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/clients');
    return response.data;
};