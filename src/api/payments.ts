import apiClient from './client';
import type { Payment } from '@/types';

export const paymentsApi = {
    createPayment: async (data: Partial<Payment>): Promise<Payment> => {
        const response = await apiClient.post<Payment>('/payments', data);
        return response.data;
    },

    getPayment: async (id: string): Promise<Payment> => {
        const response = await apiClient.get<Payment>(`/payments/${id}`);
        return response.data;
    },
};
