import api from './api';
import type { Document, CreateDocumentDto } from '../types/Document';

export const getAllDocuments = async (): Promise<Document[]> => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
};

export const createDocument = async (dto: CreateDocumentDto): Promise<Document> => {
    const response = await api.post<Document>('/documents', dto);
    return response.data;
};

export const deleteDocument = async (id: number): Promise<void> => {
    await api.delete(`/documents/${id}`);
};

