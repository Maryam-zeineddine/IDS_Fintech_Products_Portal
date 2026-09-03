export interface Module {
    id: number;
    productId: number;
    name: string;
    description: string | null;
    moduleStatusId: number;
}

export interface CreateModuleDto {
    productId: number;
    name: string;
    description?: string;
    moduleStatusId: number;
}