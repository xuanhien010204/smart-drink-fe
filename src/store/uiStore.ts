import { create } from 'zustand';

interface UIState {
    isLoading: boolean;
    notification: { message: string; type: 'success' | 'error' | 'info' } | null;
    setLoading: (isLoading: boolean) => void;
    showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
    clearNotification: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoading: false,
    notification: null,
    setLoading: (isLoading) => set({ isLoading }),
    showNotification: (message, type) => set({ notification: { message, type } }),
    clearNotification: () => set({ notification: null }),
}));
