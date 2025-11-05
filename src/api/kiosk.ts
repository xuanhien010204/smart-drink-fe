import apiClient from './client';

export const kioskApi = {
    recognizeFace: async (faceData: string): Promise<{ user_id: string; confidence: number }> => {
        const response = await apiClient.post<{ user_id: string; confidence: number }>('/kiosk/face/recognize', { faceData });
        return response.data;
    },

    logInteraction: async (kioskId: string, eventType: string, data?: unknown): Promise<void> => {
        await apiClient.post('/kiosk/interactions', { kioskId, eventType, data });
    },
};
