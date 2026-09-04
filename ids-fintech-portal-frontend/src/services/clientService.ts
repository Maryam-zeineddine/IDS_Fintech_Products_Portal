import api from './api';
import type { Client } from '../types/Client';

export interface CreateClientDto {
  companyName: string;
  country?: string;
  contactInfo?: string;
  clientStatusId: number;
  notes?: string;
}

export interface UpdateClientDto extends CreateClientDto {}

export const getAllClients = async (): Promise<Client[]> => {
  const response = await api.get<Client[]>('/clients');
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await api.get<Client>(`/clients/${id}`);
  return response.data;
};

export const createClient = async (dto: CreateClientDto): Promise<Client> => {
  const response = await api.post<Client>('/clients', dto);
  return response.data;
};

export const updateClient = async (id: number, dto: UpdateClientDto): Promise<void> => {
  await api.put(`/clients/${id}`, dto);
};

export const deleteClient = async (id: number): Promise<void> => {
  await api.delete(`/clients/${id}`);
};