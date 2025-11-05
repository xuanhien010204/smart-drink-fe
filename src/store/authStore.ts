import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
    user: User | null;
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    // Initialize from localStorage
    const storedToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    return {
        user: storedUser ? JSON.parse(storedUser) : null,
        accessToken: storedToken || '',
        refreshToken: storedRefreshToken || '',
        isAuthenticated: !!storedToken,

        login: (accessToken, refreshToken, user) => {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            set({ accessToken, refreshToken, user, isAuthenticated: true });
        },

        logout: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            set({ accessToken: '', refreshToken: '', user: null, isAuthenticated: false });
        },
    };
});
