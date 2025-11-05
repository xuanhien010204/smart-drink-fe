import React from 'react';

interface CartSummaryProps {
    subtotal: number;
    discount?: number;
    total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, discount = 0, total }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
            <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{subtotal.toLocaleString('vi-VN')} ₫</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span className="font-semibold">-{discount.toLocaleString('vi-VN')} ₫</span>
                    </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-xl text-gray-900">
                    <span>Total:</span>
                    <span className="text-primary">{total.toLocaleString('vi-VN')} ₫</span>
                </div>
            </div>
        </div>
    );
};
