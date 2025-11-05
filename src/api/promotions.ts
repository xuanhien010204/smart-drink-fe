import apiClient from './client';
import type { Promotion } from '@/types';

export interface ValidatePromotionRequest {
    code: string;
    cartAmount: number;
}

export interface ValidatePromotionResponse {
    valid: boolean;
    discountAmount: number;
    promotion?: Promotion;
}

export const promotionsApi = {
    getPromotions: async (): Promise<Promotion[]> => {
        const response = await apiClient.get<Promotion[]>('/promotions');
        return response.data;
    },

    validatePromotion: async (data: ValidatePromotionRequest): Promise<ValidatePromotionResponse> => {
        const response = await apiClient.post<ValidatePromotionResponse>('/promotions/validate', data);
        return response.data;
    },
};

export const walletApi = {
    getBalance: async (userId: string): Promise<{ balance: number }> => {
        const response = await apiClient.get<{ balance: number }>(`/wallet/${userId}`);
        return response.data;
    },
};
