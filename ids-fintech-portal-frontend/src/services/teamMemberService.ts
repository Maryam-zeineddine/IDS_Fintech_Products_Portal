import api from './api';
import type { TeamMember } from '../types/TeamMember';

export interface CreateTeamMemberDto {
    fullName: string;
    department?: string;
    jobTitle?: string;
    email: string;
}

export interface UpdateTeamMemberDto extends CreateTeamMemberDto {
    isActive: boolean;
}

export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
    const response = await api.get<TeamMember[]>('/teammembers');
    return response.data;
};

export const getTeamMemberById = async (id: number): Promise<TeamMember> => {
    const response = await api.get<TeamMember>(`/teammembers/${id}`);
    return response.data;
};

export const createTeamMember = async (dto: CreateTeamMemberDto): Promise<TeamMember> => {
  const response = await api.post<TeamMember>('/teammembers', dto);
  return response.data;
};

export const updateTeamMember = async (id: number, dto: UpdateTeamMemberDto): Promise<void> => {
    await api.put(`/teammembers/${id}`, dto);
};

export const deleteTeamMember = async (id: number): Promise<void> => {
    await api.delete(`/teammembers/${id}`);
}
