import api from './api';
import { Analytics } from '../types';

export const analyticsService = {
    async getAnalytics(): Promise<Analytics> {
        const response = await api.get<Analytics>('/api/analytics/');
        return response.data;
    },
};
