import api from "./api";
import type { DeploymentEnvironment, CreateEnvironmentDto } from "../types/Environment";

export const getAllEnvironments = async (): Promise<DeploymentEnvironment[]> => {
    const response = await api.get<DeploymentEnvironment[]>('/environments');
    return response.data;
};

export  const createEnvironment = async (dto: CreateEnvironmentDto): Promise<DeploymentEnvironment> => {
    const response = await api.post<DeploymentEnvironment>('/environments', dto);
    return response.data;
};

export const deleteEnvironment = async (id: number): Promise<void> => {
    await api.delete(`/environments/${id}`);
};