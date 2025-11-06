import apiClient from './client';
import type { Order } from '@/types';

export interface CreateOrderRequest {
    customer_id?: string;
    items: Array<{
        product_id: string;
        quantity: number;
        variants?: string[];
    }>;
    promotion_code?: string;
}

export const ordersApi = {
    createOrder: async (data: CreateOrderRequest): Promise<Order> => {
        const response = await apiClient.post<Order>('/orders', data);
        return response.data;
    },

    getOrder: async (orderId: string): Promise<Order> => {
        const response = await apiClient.get<Order>(`/orders/${orderId}`);
        return response.data;
    },
};
