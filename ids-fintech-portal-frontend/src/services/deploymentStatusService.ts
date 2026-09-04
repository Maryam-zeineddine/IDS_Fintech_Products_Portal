import api from './api';

export interface DeploymentStatus {
  Id: number;
  Status: string;
}

export const getAllDeploymentStatuses = async (): Promise<DeploymentStatus[]> => {
  const response = await api.get<DeploymentStatus[]>('/deploymentstatus');
  return response.data;
};