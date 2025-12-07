import api from './api';
import { Admin, Token } from '../types';

export const authService = {
    async login(username: string, password: string): Promise<Token> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post<Token>('/api/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }

        return response.data;
    },

    async getCurrentAdmin(): Promise<Admin> {
        const response = await api.get<Admin>('/api/auth/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    },
};
