export interface Client {
    id: number;
    companyName: string;
    country: string | null;
    contactInfo: string | null;
    clientStatusId: number;
    notes: string | null;
}