import apiClient from './client';
import type { Category, Product } from '@/types';

type PaginatedResponse<T> = {
    items: T[];
    meta?: {
        totalItems?: number;
        itemCount?: number;
        itemsPerPage?: number;
        totalPages?: number;
        currentPage?: number;
    };
};

export const catalogApi = {
    getCategories: async (): Promise<Category[]> => {
        const response = await apiClient.get<PaginatedResponse<Category> | Category[]>('/categories');
        const data = response.data as any;
        return Array.isArray(data) ? data : data.items ?? [];
    },

    getCategoriesPage: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Category>> => {
        const response = await apiClient.get<PaginatedResponse<Category>>('/categories', { params });
        return response.data;
    },

    getProducts: async (params?: { category?: string; q?: string; tags?: string; page?: number; limit?: number }): Promise<Product[]> => {
        const response = await apiClient.get<PaginatedResponse<Product> | Product[]>('/products', { params });
        const data = response.data as any;
        return Array.isArray(data) ? data : data.items ?? [];
    },

    getProductsPage: async (params?: { category?: string; q?: string; tags?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Product>> => {
        const response = await apiClient.get<PaginatedResponse<Product>>('/products', { params });
        return response.data;
    },

    getProduct: async (id: string): Promise<Product> => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },
};
