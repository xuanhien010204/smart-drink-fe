// Mock API utility for development
// This intercepts axios requests and returns mock data from JSON files

import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import categoriesData from '@/mocks/categories.json';
import productsData from '@/mocks/products.json';
import usersData from '@/mocks/users.json';
import promotionsData from '@/mocks/promotions.json';
import ordersData from '@/mocks/orders.json';

export const mockApiInterceptor = (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
    const { url, method } = config;

    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            let data = null;
            let status = 200;

            try {
                // Categories
                if (url?.includes('/categories') && method === 'get') {
                    data = categoriesData;
                }
                // Products
                else if (url?.includes('/products') && !url.includes('/products/') && method === 'get') {
                    data = productsData;
                }
                // Product by ID
                else if (url?.match(/\/products\/[\w-]+$/) && method === 'get') {
                    const productId = url.split('/').pop();
                    data = productsData.find((p) => p.product_id === productId);
                    if (!data) status = 404;
                }
                // Promotions
                else if (url?.includes('/promotions') && method === 'get') {
                    data = promotionsData;
                }
                // Validate promotion
                else if (url?.includes('/promotions/validate') && method === 'post') {
                    const code = (config.data as { code?: string })?.code;
                    const promo = promotionsData.find((p) => p.code === code && p.is_active);
                    if (promo) {
                        data = {
                            valid: true,
                            discountAmount: promo.discount_value,
                            promotion: promo,
                        };
                    } else {
                        data = { valid: false, discountAmount: 0 };
                    }
                }
                // Create order
                else if (url?.includes('/orders') && method === 'post') {
                    const orderCode = `SD-${Date.now().toString().slice(-6)}`;
                    data = {
                        order_id: `o-${Date.now()}`,
                        order_code: orderCode,
                        order_status: 'PENDING',
                        subtotal: 50000,
                        total_amount: 45000,
                        created_at: new Date().toISOString(),
                    };
                }
                // Get order by code
                else if (url?.match(/\/orders\/code\/[\w-]+$/) && method === 'get') {
                    const orderCode = url.split('/').pop();
                    data = ordersData.find((o) => o.order_code === orderCode) || {
                        order_id: 'o-mock',
                        order_code: orderCode,
                        order_status: 'COMPLETED',
                        subtotal: 50000,
                        total_amount: 45000,
                        created_at: new Date().toISOString(),
                    };
                }
                // Login
                else if (url?.includes('/auth/login') && method === 'post') {
                    const { email } = config.data as { email: string; password: string };
                    const user = usersData.find((u) => u.email === email);
                    if (user && user.role === 'ADMIN') {
                        data = {
                            accessToken: 'mock-access-token-' + Date.now(),
                            refreshToken: 'mock-refresh-token-' + Date.now(),
                            user,
                        };
                    } else {
                        status = 401;
                        data = { error: 'Invalid credentials' };
                    }
                }
                // Face recognition
                else if (url?.includes('/kiosk/face/recognize') && method === 'post') {
                    data = {
                        user_id: 'u-demo-1',
                        confidence: 0.95,
                    };
                }
                // Default fallback
                else {
                    data = { message: 'Mock API: Endpoint not implemented' };
                }

                resolve({
                    data,
                    status,
                    statusText: status === 200 ? 'OK' : 'Error',
                    headers: {},
                    config: config as InternalAxiosRequestConfig,
                });
            } catch {
                resolve({
                    data: { error: 'Mock API error' },
                    status: 500,
                    statusText: 'Internal Server Error',
                    headers: {},
                    config: config as InternalAxiosRequestConfig,
                });
            }
        }, 500); // 500ms delay to simulate network
    });
};
