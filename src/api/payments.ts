import apiClient from './client';
import type { PaymentQR, PaymentStatus } from '@/types';

export const paymentsApi = {
    generateQR: async (orderId: string, amount: number): Promise<PaymentQR> => {
        const response = await apiClient.post<PaymentQR>('/payments/qr', { orderId, amount });
        return response.data;
    },

    getPaymentStatus: async (transactionId: string): Promise<PaymentStatus> => {
        const response = await apiClient.get<PaymentStatus>(`/payments/${transactionId}/status`);
        return response.data;
    },
};
