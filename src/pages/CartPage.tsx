import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { useCartStore } from '@/store/cartStore';

export const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, updateQuantity, removeItem, getSubtotal, getTotal } = useCartStore();

    const subtotal = getSubtotal();
    const total = getTotal();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <TopNav />
                <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-6">🛒</div>
                        <h1 className="text-4xl font-bold mb-4 text-gray-800">Your cart is empty</h1>
                        <p className="text-xl text-gray-600 mb-8">Add some delicious drinks to get started!</p>
                        <button
                            onClick={() => navigate('/menu')}
                            className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Browse Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {items.map((item) => (
                            <CartItem
                                key={item.productId}
                                item={item}
                                onUpdateQuantity={(qty) => updateQuantity(item.productId, qty)}
                                onRemove={() => removeItem(item.productId)}
                            />
                        ))}
                    </div>

                    <div>
                        <CartSummary
                            subtotal={subtotal}
                            discount={subtotal - total}
                            total={total}
                        />
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full mt-6 bg-secondary text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
                        >
                            Proceed to Checkout →
                        </button>
                        <button
                            onClick={() => navigate('/menu')}
                            className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
