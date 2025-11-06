import apiClient from './client';
import type { User } from '@/types';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
        const response = await apiClient.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
        return response.data;
    },
};
