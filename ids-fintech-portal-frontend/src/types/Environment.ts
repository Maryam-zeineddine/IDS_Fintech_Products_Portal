export interface DeploymentEnvironment {
    id: number;
    deploymentId: number;
    environmentName: string;
    environmentType: string;
    purpose: string | null;
    serverName: string | null;
    operatingSystem: string | null;
    applicationUrl: string | null;
    databaseInfo: string | null;
    monitoringLink: string | null;
    accessInstructions: string | null;
    notes: string | null;
}

export interface CreateEnvironmentDto {
    deploymentId: number;
    environmentName: string;
    environmentType: string;
    purpose?: string;
    serverName?: string;
    operatingSystem?: string;
    applicationUrl?: string;
    databaseInfo?: string;
    monitoringLink?: string;
    accessInstructions?: string;
    notes?: string;
}