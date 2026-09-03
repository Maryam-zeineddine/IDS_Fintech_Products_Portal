export interface Repository  {
    id: number;
    productId: number;
    repoName: string;
    githubUrl: string;
    mainBranch: string | null;
    description: string | null;
}

export interface CreateRepositoryDto {
    productId: number;
    repoName: string;
    githubUrl: string;
    mainBranch?: string;
    description?: string;
}