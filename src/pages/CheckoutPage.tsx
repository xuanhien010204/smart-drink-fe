import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { CartSummary } from '@/components/CartSummary';
import { useCartStore } from '@/store/cartStore';
import { ordersApi } from '@/api/orders';
import { promotionsApi } from '@/api/promotions';

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, promo, getSubtotal, getTotal, applyPromo, clearCart } = useCartStore();
    const [promoCode, setPromoCode] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [promoError, setPromoError] = useState('');

    const subtotal = getSubtotal();
    const total = getTotal();

    const handleApplyPromo = async () => {
        setPromoError('Promo validation not available');
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            const order = await ordersApi.createOrder({
                items: items.map((item) => ({
                    product_id: item.productId,
                    quantity: item.qty,
                    variants: item.variants?.map((v) => v.variant_id),
                })),
                promotion_code: promo?.code,
            });
            clearCart();
            navigate(`/order/${order.order_id}`);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Items</h2>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.productId} className="flex justify-between border-b pb-2">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                                        {item.variants && item.variants.length > 0 && (
                                            <p className="text-xs text-gray-500">{item.variants.map((v) => v.variant_name).join(', ')}</p>
                                        )}
                                    </div>
                                    <p className="font-semibold">{item.subtotal.toLocaleString('vi-VN')} ₫</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Promo Code</h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                placeholder="Enter promo code"
                                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={handleApplyPromo}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                        {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                        {promo && (
                            <div className="mt-3 p-3 bg-green-100 text-green-800 rounded-lg">
                                ✓ Promo code "{promo.code}" applied successfully!
                            </div>
                        )}
                    </div>

                    <CartSummary
                        subtotal={subtotal}
                        discount={subtotal - total}
                        total={total}
                    />

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full mt-6 bg-secondary text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                        {isProcessing ? 'Processing...' : `Place Order - ${total.toLocaleString('vi-VN')} ₫`}
                    </button>
                </div>
            </div>
        </div>
    );
};
