import { create } from 'zustand';

interface KioskSessionState {
    kioskId: string;
    recognizedUserId: string | null;
    faceConfidence: number;
    setKioskId: (kioskId: string) => void;
    setRecognizedUser: (userId: string, confidence: number) => void;
    clearSession: () => void;
}

export const useKioskSessionStore = create<KioskSessionState>((set) => ({
    kioskId: 'kiosk-001',
    recognizedUserId: null,
    faceConfidence: 0,
    setKioskId: (kioskId) => set({ kioskId }),
    setRecognizedUser: (userId, confidence) => set({ recognizedUserId: userId, faceConfidence: confidence }),
    clearSession: () => set({ recognizedUserId: null, faceConfidence: 0 }),
}));
