import api from './api';
import type { DeploymentModule } from '../types/DeploymentModule';

export const getModulesForDeployment = async (deploymentId: number): Promise<DeploymentModule[]> => {
    const response = await api.get<DeploymentModule[]>(`/deploymentmodules/by-deployment/${deploymentId}`);
    return response.data;
};

export const addModuleToDeployment = async (deploymentId: number, moduleId: number): Promise<void> => {
    await api.post('/deploymentmodules', {deploymentId, moduleId});
};

export const removeModuleFromDeployment = async (id: number): Promise<void> => {
    await api.delete(`/deploymentmodules/${id}`);
};