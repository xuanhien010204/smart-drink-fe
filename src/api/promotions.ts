import apiClient from './client';
import type { Promotion } from '@/types';

export const promotionsApi = {
    getPromotions: async (): Promise<Promotion[]> => {
        const response = await apiClient.get<Promotion[]>('/promotions');
        return response.data;
    },
};

export const walletApi = {
    getBalance: async (userId: string): Promise<{ balance: number }> => {
        const response = await apiClient.get<{ balance: number }>(`/wallets/${userId}`);
        return response.data;
    },
};
