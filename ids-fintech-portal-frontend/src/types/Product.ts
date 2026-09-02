export interface Product {
    id: number;
  name: string;
  description: string | null;
  businessPurpose: string | null;
  productStatusId: number;
  currentVersion: string | null;
  supportedMarkets: string | null;
  criticality: string | null;
  technologies: string | null;
  notes: string | null;
}

export interface CreateProductDto {
    name: string;
  description?: string;
  businessPurpose?: string;
  productStatusId: number;
  currentVersion?: string;
  supportedMarkets?: string;
  criticality?: string;
  technologies?: string;
  notes?: string;
}

export interface UpdateProductDto extends CreateProductDto {}