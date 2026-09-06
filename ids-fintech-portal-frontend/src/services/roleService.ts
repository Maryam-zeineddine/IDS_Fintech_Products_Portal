import api from "./api";
import type { Role } from "../types/Role";

export const getAllRoles = async (): Promise<Role[]> => {
    const response = await api.get<Role[]>('/roles');
    return response.data;
};