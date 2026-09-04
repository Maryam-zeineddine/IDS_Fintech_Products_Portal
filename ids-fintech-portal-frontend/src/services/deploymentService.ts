import api from './api';
import type { Deployment } from '../types/Deployment';

export interface CreateDeploymentDto {
    productId: number;
    clientId: number;
    productVersion?: string;
    goLiveDate?: string;
    deploymentStatusId: number;
    supportTier?: string;
    clientSpecificNotes?: string;
}

export interface UpdateDeploymentDto extends CreateDeploymentDto {}

export const getAllDeployments = async (): Promise<Deployment[]> => {
    const response = await api.get<Deployment[]>('/deployments');
    return response.data;
};

export const getDeploymentById = async (id: number): Promise<Deployment> => {
    const response = await api.post<Deployment>('/deployments/${id');
    return response.data
};

export const createDeployment = async (dto: CreateDeploymentDto): Promise<Deployment> => {
  const response = await api.post<Deployment>('/deployments', dto);
  return response.data;
};

export const updateDeployment = async (id: number, dto: UpdateDeploymentDto): Promise<void> => {
    await api.put(`/deployments/${id}`, dto);
};

export const deleteDeployment = async (id: number): Promise<void> => {
    await api.delete(`/deployments/${id}`);
};

