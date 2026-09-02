import api from './api';
import type { LoginDto, LoginResponse } from '../types/Auth';

export const login = async (dto: LoginDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', dto);
    return response.data;
};