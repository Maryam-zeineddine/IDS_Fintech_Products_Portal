import api from './api';
import type { ProductStatus } from '../types/ProductStatus';

export const getAllProductStatuses = async (): Promise<ProductStatus[]> => {
    const response = await api.get<ProductStatus[]>('/productstatus');
    return response.data;
};