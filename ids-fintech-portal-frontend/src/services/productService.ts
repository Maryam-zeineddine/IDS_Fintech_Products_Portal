import api from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '../types/Product';

const API_BASE_URL = 'http://localhost:5295/api/products';

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>(API_BASE_URL);
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createProduct = async (dto: CreateProductDto): Promise<Product> => {
    const response = await api.post<Product>(API_BASE_URL, dto);
    return response.data;
};

export const updateProduct = async (id: number, dto: UpdateProductDto): Promise<void> => {
    await api.put<Product>(`${API_BASE_URL}/${id}`, dto);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`${API_BASE_URL}/${id}`);
};