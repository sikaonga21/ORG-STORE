import api from './api';
import { Project, ProjectCreate, ProjectStatus } from '../types';

export const projectService = {
    async getAll(statusFilter?: ProjectStatus, organizationId?: number): Promise<Project[]> {
        const params: any = {};
        if (statusFilter) params.status_filter = statusFilter;
        if (organizationId) params.organization_id = organizationId;

        const response = await api.get<Project[]>('/api/projects/', { params });
        return response.data;
    },

    async getById(id: number): Promise<Project> {
        const response = await api.get<Project>(`/api/projects/${id}`);
        return response.data;
    },

    async create(data: ProjectCreate): Promise<Project> {
        const response = await api.post<Project>('/api/projects/', data);
        return response.data;
    },

    async update(id: number, data: Partial<ProjectCreate>): Promise<Project> {
        const response = await api.put<Project>(`/api/projects/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/projects/${id}`);
    },
};
