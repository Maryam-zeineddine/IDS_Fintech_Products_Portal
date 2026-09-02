import api from './api';
import type { TeamMember } from '../types/TeamMember';

export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
    const response = await api.get<TeamMember[]>('/teammembers');
    return response.data;
};
