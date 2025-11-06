import axios from 'axios';
import { mockApiInterceptor } from '@/utils/mockApi';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5173';

const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Use mock API via ENV (default: DEV)
// const USE_MOCK_API = (import.meta as any).env?.VITE_USE_MOCK === 'true' || import.meta.env.DEV;

// if (USE_MOCK_API) {
//     apiClient.interceptors.request.use(
//         (config) => {
//             // Intercept and return mock data
//             return mockApiInterceptor(config) as unknown as Promise<typeof config>;
//         },
//         (error) => Promise.reject(error)
//     );
// }

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Response interceptor: on 401, clear tokens and redirect (no refresh flow on BE)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
