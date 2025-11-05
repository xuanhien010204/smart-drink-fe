import apiClient from './client';
import type { Category, Product } from '@/types';

export const catalogApi = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get<Category[]>('/categories');
        return response.data;
    },

    getProducts: async (params?: { category?: string; q?: string; tags?: string }): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/products', { params });
        return response.data;
    },

    getProduct: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },
};
