import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { ordersApi } from '@/api/orders';
import type { Order } from '@/types';

export const OrderStatus: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const loadOrder = async () => {
            if (!code) return;
            try {
                const data = await ordersApi.getOrderByCode(code);
                setOrder(data);
            } catch (error) {
                console.error('Error loading order:', error);
            }
        };
        loadOrder();
    }, [code]);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50">
                <TopNav />
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-xl">Loading order...</p>
                </div>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        PENDING: 'text-yellow-600 bg-yellow-100',
        PROCESSING: 'text-blue-600 bg-blue-100',
        COMPLETED: 'text-green-600 bg-green-100',
        CANCELLED: 'text-red-600 bg-red-100',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[80vh]">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full text-center">
                    <div className="text-8xl mb-6">✓</div>
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">Order Placed!</h1>
                    <p className="text-xl text-gray-600 mb-8">Your order has been received successfully</p>

                    <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 mb-8">
                        <p className="text-sm mb-2 opacity-90">Order Code</p>
                        <p className="text-4xl font-bold tracking-wider">{order.order_code}</p>
                    </div>

                    <div className="text-left space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-4 py-2 rounded-full font-semibold ${statusColors[order.order_status]}`}>
                                {order.order_status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Amount:</span>
                            <span className="font-bold text-2xl text-primary">{order.total_amount.toLocaleString('vi-VN')} ₫</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Order Time:</span>
                            <span className="font-semibold">{new Date(order.created_at).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="border-t pt-6 space-y-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate('/menu')}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Order Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
