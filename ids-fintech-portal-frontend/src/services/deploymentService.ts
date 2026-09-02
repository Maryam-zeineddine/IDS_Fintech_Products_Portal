import api from './api';
import type { Deployment } from '../types/Deployment';

export const getAllDeployments = async (): Promise<Deployment[]> => {
    const response = await api.get<Deployment[]>('/deployments');
    return response.data;
};