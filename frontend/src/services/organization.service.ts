import api from './api';
import { Organization, OrganizationCreate, OrganizationUpdate } from '../types';

export const organizationService = {
    async getAll(search?: string): Promise<Organization[]> {
        const params = search ? { search } : {};
        const response = await api.get<Organization[]>('/api/organizations/', { params });
        return response.data;
    },

    async getById(id: number): Promise<Organization> {
        const response = await api.get<Organization>(`/api/organizations/${id}`);
        return response.data;
    },

    async create(data: OrganizationCreate): Promise<Organization> {
        const response = await api.post<Organization>('/api/organizations/', data);
        return response.data;
    },

    async update(id: number, data: OrganizationUpdate): Promise<Organization> {
        const response = await api.put<Organization>(`/api/organizations/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/api/organizations/${id}`);
    },
};
