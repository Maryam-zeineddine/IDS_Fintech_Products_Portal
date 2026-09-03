import api from './api';
import type { ProductResponsibility, CreateProductResponsibilityDto } from '../types/ProductResponsibility';

export const getAllProductResponsibilities = async (): Promise<ProductResponsibility[]> => {
    const response = await api.get<ProductResponsibility[]>('/productresponsibilities');
    return response.data;
};

export const createProductResponsibility = async (dto: CreateProductResponsibilityDto): Promise<ProductResponsibility> => {
    const response = await api.post<ProductResponsibility>('/productresponsibilities', dto);
    return response.data;
};

export const deleteProductResponsibility = async (id: number): Promise<void> => {
    await api.delete(`/productresponsibilities/${id}`);
};

