import apiClient from './client';

const IS_DEV = import.meta.env.DEV;

export const kioskApi = {
    // Backend chưa hỗ trợ: trả về mock ở DEV, còn lại ném lỗi mềm
    recognizeFace: async (_faceData: string): Promise<{ user_id: string; confidence: number }> => {
        if (IS_DEV) {
            return Promise.resolve({ user_id: 'mock-user-id', confidence: 0.92 });
        }
        return Promise.reject(new Error('Face recognition not supported by backend'));
    },

    // Không bắt buộc backend: ghi log no-op
    logInteraction: async (_kioskId: string, _eventType: string, _data?: unknown): Promise<void> => {
        if (IS_DEV) return Promise.resolve();
        // Optional: route exists only if implemented later
        try {
            await apiClient.post('/kiosk/interactions', { _kioskId, _eventType, _data });
        } catch {
            // swallow
        }
    },
};
