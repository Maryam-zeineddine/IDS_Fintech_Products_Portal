import api from './api';

export interface ClientStatus {
  Id: number;
  Status: string;
}

export const getAllClientStatuses = async (): Promise<ClientStatus[]> => {
  const response = await api.get<ClientStatus[]>('/clientstatus');
  return response.data;
};