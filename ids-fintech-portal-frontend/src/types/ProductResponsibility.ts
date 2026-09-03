export interface ProductResponsibility {
    id: number;
    productId: number;
    teamMemberId: number;
    responsibility: string;
    description: string | null;
}

export interface CreateProductResponsibilityDto {
    productId: number;
    teamMemberId: number;
    responsibility: string;
    description?: string;
}