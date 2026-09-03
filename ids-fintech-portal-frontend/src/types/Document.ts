export interface Document {
    id: number;
    documentName: string;
    documentType: string | null;
    productId: number;
    description: string | null;
    fileReference: string | null;
    lastUpdatedDate: string | null;
}

export interface CreateDocumentDto {
    documentName: string;
    documentType?: string;
    productId: number;
    description?: string;
    fileReference?: string;
    lastUpdatedDate?: string;
}
