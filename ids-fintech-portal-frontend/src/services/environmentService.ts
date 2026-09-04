import api from "./api";
import type { DeploymentEnvironment, CreateEnvironmentDto } from "../types/Environment";

export const getAllEnvironments = async (): Promise<DeploymentEvironment[]> => {
    const response = await api.get<DeploymentEvironment[]>('/environments');
    return response.data;
};

export  const createEnvironment = async (dto: CreateEnvironmentDto): Promise<DeploymentEvironment> => {
    const response = await api.post<DeploymentEvironment>('/environments', dto);
    return response.data;
};

export const deleteEnvironment = async (id: number): Promise<void> => {
    await api.delete(`/environments/${id}`);
};