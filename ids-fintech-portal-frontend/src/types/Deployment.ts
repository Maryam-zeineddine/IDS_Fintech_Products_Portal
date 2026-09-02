export interface Deployment {
    id: number;
    productId: number;
    clientId: number;
    productVersion: string | null;
    goLiveDate: string | null;
    deploymentStatusId: number;
    supportTier: string | null;
    clientSpecificNotes: string | null;
}