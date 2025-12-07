import api from './api';
import { Activity, ActivityCreate } from '../types';

export const activityService = {
    async getAll(organizationId?: number, projectId?: number): Promise<Activity[]> {
        const params: any = {};
        if (organizationId) params.organization_id = organizationId;
        if (projectId) params.project_id = projectId;

        const response = await api.get<Activity[]>('/api/activities/', { params });
        return response.data;
    },

    async getById(id: number): Promise<Activity> {
        const response = await api.get<Activity>(`/api/activities/${id}`);
        return response.data;
    },

    async create(data: ActivityCreate): Promise<Activity> {
        const response = await api.post<Activity>('/api/activities/', data);
        return response.data;
    },

    async update(id: number, data: Partial<ActivityCreate>): Promise<Activity> {
        const response = await api.put<Activity>(`/api/activities/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/activities/${id}`);
    },
};
