export interface TeamMember {
    id: number;
    fullName: string;
    department: string | null;
    jobTitle: string | null;
    email: string;
    isActive: boolean;
}