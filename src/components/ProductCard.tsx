import React from 'react';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
        >
            <div className="relative overflow-hidden">
                <img
                    src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {!product.is_available && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2">😔</div>
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    </div>
                )}
                {product.is_available && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Available
                    </div>
                )}
                {product.calories && product.calories > 0 && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                        🔥 {product.calories} cal
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Starting from</span>
                        <p className="text-blue-600 font-extrabold text-2xl">
                            {product.base_price.toLocaleString('vi-VN')}₫
                        </p>
                    </div>
                    {product.preparation_time && (
                        <div className="text-center bg-blue-50 px-3 py-2 rounded-lg">
                            <div className="text-xl">⏱️</div>
                            <span className="text-xs font-semibold text-gray-600">
                                {Math.floor(product.preparation_time / 60)}min
                            </span>
                        </div>
                    )}
                </div>

                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {product.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-linear-to-r from-blue-50 to-purple-50 text-gray-700 px-3 py-1.5 rounded-full font-medium border border-blue-100"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <button className="mt-4 w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95">
                    Order Now →
                </button>
            </div>
        </div>
    );
};
