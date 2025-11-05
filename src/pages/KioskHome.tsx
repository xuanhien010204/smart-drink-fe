import React from 'react';
import { useNavigate } from 'react-router-dom';

export const KioskHome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
                {/* Logo/Brand */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <div className="text-9xl animate-bounce">☕</div>
                    </div>
                    <h1 className="text-8xl font-black text-white mb-6 drop-shadow-2xl">
                        SmartDrink
                    </h1>
                    <p className="text-3xl text-white/90 font-light tracking-wide">
                        Your Smart Beverage Experience
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                            ⚡ Fast Service
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                            🎯 Personalized
                        </span>
                        <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                            😋 Delicious
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-6 items-center max-w-2xl w-full">
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-full bg-white text-blue-600 px-12 py-8 rounded-3xl text-4xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform active:scale-95 flex items-center justify-center gap-4 group"
                    >
                        <span className="text-5xl group-hover:scale-110 transition-transform">🛒</span>
                        <span>Start Ordering</span>
                    </button>

                    <button
                        onClick={() => navigate('/face-scan')}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-6 rounded-3xl text-2xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-purple-500/50 hover:scale-105 transform active:scale-95 flex items-center justify-center gap-3 group"
                    >
                        <span className="text-4xl group-hover:rotate-12 transition-transform">😊</span>
                        <span>Face Recognition</span>
                    </button>

                    <button
                        onClick={() => navigate('/admin/login')}
                        className="mt-4 text-white/70 hover:text-white text-lg underline decoration-dotted transition-colors"
                    >
                        Staff Login →
                    </button>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 text-center w-full">
                    <p className="text-white/60 text-2xl font-light animate-pulse">
                        👆 Touch to begin your journey
                    </p>
                </div>
            </div>
        </div>
    );
};
