import api from './api';
import type { Repository, CreateRepositoryDto } from '../types/Repository';

export const getAllRepositories = async (): Promise<Repository[]> => {
    const response = await api.get<Repository[]>('/repositories');
    return response.data;
};

export const createRepository = async (dto: CreateRepositoryDto): Promise<Repository> => {
    const response = await api.post<Repository>('/repositories', dto);
    return response.data;
};

export const deleteRepository = async (id: number): Promise<void> => {
    await api.delete(`/repositories/${id}`);
};