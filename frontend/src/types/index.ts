export interface Admin {
    id: number;
    username: string;
    email: string;
    full_name?: string;
    created_at: string;
}

export interface Organization {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    website?: string;
    contact_person?: string;
    created_at: string;
    updated_at?: string;
}

export interface OrganizationCreate {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    website?: string;
    contact_person?: string;
}

export interface OrganizationUpdate {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    description?: string;
    website?: string;
    contact_person?: string;
}

export enum ProjectStatus {
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    PLANNED = 'planned',
    ON_HOLD = 'on_hold',
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    status: ProjectStatus;
    organization_id: number;
    start_date?: string;
    end_date?: string;
    budget?: string;
    created_at: string;
    updated_at?: string;
}

export interface ProjectCreate {
    name: string;
    description?: string;
    status?: ProjectStatus;
    organization_id: number;
    start_date?: string;
    end_date?: string;
    budget?: string;
}

export interface Activity {
    id: number;
    title: string;
    description?: string;
    organization_id: number;
    project_id?: number;
    activity_date?: string;
    created_at: string;
    updated_at?: string;
}

export interface ActivityCreate {
    title: string;
    description?: string;
    organization_id: number;
    project_id?: number;
    activity_date?: string;
}

export interface Analytics {
    total_organizations: number;
    total_projects: number;
    ongoing_projects: number;
    completed_projects: number;
    planned_projects: number;
    on_hold_projects: number;
    total_activities: number;
    recent_activities_count: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Token {
    access_token: string;
    token_type: string;
}
