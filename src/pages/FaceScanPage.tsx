import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { kioskApi } from '@/api/kiosk';
import { useKioskSessionStore } from '@/store/kioskSessionStore';

export const FaceScanPage: React.FC = () => {
    const navigate = useNavigate();
    const { setRecognizedUser } = useKioskSessionStore();
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleScan = async () => {
        setScanning(true);
        setResult(null);

        // Simulate face scanning with delay
        setTimeout(async () => {
            try {
                // Mock face data for demo
                const mockFaceData = 'mock-face-data-12345';
                const response = await kioskApi.recognizeFace(mockFaceData);

                setRecognizedUser(response.user_id, response.confidence);
                setResult({
                    success: true,
                    message: `Welcome back! Confidence: ${(response.confidence * 100).toFixed(1)}%`,
                });

                // Navigate to menu after 2 seconds
                setTimeout(() => {
                    navigate('/menu');
                }, 2000);
            } catch (error) {
                console.error('Face recognition error:', error);
                setResult({
                    success: false,
                    message: 'Face not recognized. Please try again or continue as guest.',
                });
            } finally {
                setScanning(false);
            }
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">Face Recognition</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Scan your face to get personalized recommendations
                    </p>

                    <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
                        <div className="relative">
                            <div className="w-64 h-64 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6 border-4 border-dashed border-gray-400">
                                {scanning ? (
                                    <div className="animate-pulse text-6xl">📷</div>
                                ) : (
                                    <div className="text-6xl">😊</div>
                                )}
                            </div>

                            {scanning && (
                                <div className="absolute top-0 left-0 right-0">
                                    <div className="h-1 bg-primary animate-pulse"></div>
                                    <p className="text-primary font-semibold mt-4 animate-pulse">Scanning...</p>
                                </div>
                            )}
                        </div>

                        {result && (
                            <div
                                className={`p-4 rounded-lg mb-6 ${result.success ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {result.message}
                            </div>
                        )}

                        <button
                            onClick={handleScan}
                            disabled={scanning}
                            className="bg-primary text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-4"
                        >
                            {scanning ? 'Scanning...' : 'Start Scan'}
                        </button>

                        <p className="text-sm text-gray-500 mt-4">
                            By using face recognition, you agree to our privacy policy
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/menu')}
                        className="text-primary hover:underline text-lg"
                    >
                        Skip and continue as guest →
                    </button>
                </div>
            </div>
        </div>
    );
};
