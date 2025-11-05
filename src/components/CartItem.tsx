import React from 'react';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (qty: number) => void;
    onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-3">
            <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-600">
                    {item.unit_price.toLocaleString('vi-VN')} ₫
                </p>
                {item.variants && item.variants.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                        Options: {item.variants.map((v) => v.variant_name).join(', ')}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onUpdateQuantity(item.qty - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                    -
                </button>
                <span className="w-10 text-center font-semibold">{item.qty}</span>
                <button
                    onClick={() => onUpdateQuantity(item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                    +
                </button>
            </div>
            <div className="text-right min-w-[100px]">
                <p className="font-bold text-gray-800">{item.subtotal.toLocaleString('vi-VN')} ₫</p>
                <button onClick={onRemove} className="text-sm text-red-500 hover:underline mt-1">
                    Remove
                </button>
            </div>
        </div>
    );
};
