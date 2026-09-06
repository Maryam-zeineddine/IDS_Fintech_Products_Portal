import api from "./api";
import type { User } from '../types/User';

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    roleId: number;
}

export interface UpdateUserDto {
    name: string;
    email: string;
    roleId: number;
    isActive: boolean;
}

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
};

export const createUser = async (dto: CreateUserDto): Promise<User> => {
    const response = await api.post<User>('/users', dto);
    return response.data;
};

export const updateUser = async (id: number, dto: UpdateUserDto): Promise<void> => {
    await api.put(`/users/${id}`, dto);
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`users/${id}`);
};