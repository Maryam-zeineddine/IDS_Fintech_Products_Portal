import api from './api';
import type { Module, CreateModuleDto } from '../types/Module';

export const getAllModules = async (): Promise<Module[]> => {
    const response = await api.get<Module[]>('/modules');
    return response.data;
};

export const createModule = async (dto: CreateModuleDto): Promise<Module> => {
  const response = await api.post<Module>('/modules', dto);
  return response.data;
};

export const deleteModule = async (id: number): Promise<void> => {
    await api.delete(`/modules/${id}`);
};

