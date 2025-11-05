import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { catalogApi } from '@/api/catalog';
import { useCartStore } from '@/store/cartStore';
import type { Product, Variant } from '@/types';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                const data = await catalogApi.getProduct(id);
                setProduct(data);
            } catch (error) {
                console.error('Error loading product:', error);
            }
        };
        loadProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <TopNav />
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    const totalPrice = product.base_price + selectedVariants.reduce((sum, v) => sum + v.price_adjustment, 0);

    const handleAddToCart = () => {
        addItem({
            productId: product.product_id,
            name: product.name,
            qty: quantity,
            unit_price: totalPrice,
            variants: selectedVariants,
            subtotal: totalPrice * quantity,
        });
        navigate('/cart');
    };

    const toggleVariant = (variant: Variant) => {
        const exists = selectedVariants.find((v) => v.variant_id === variant.variant_id);
        if (exists) {
            setSelectedVariants(selectedVariants.filter((v) => v.variant_id !== variant.variant_id));
        } else {
            // Remove other variants of the same type (e.g., can't have both S and M size)
            const filtered = selectedVariants.filter((v) => v.variant_type !== variant.variant_type);
            setSelectedVariants([...filtered, variant]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />
            <div className="container mx-auto px-4 py-8">
                <button onClick={() => navigate('/menu')} className="mb-6 text-primary hover:underline text-lg">
                    ← Back to Menu
                </button>

                <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
                    <div>
                        <img
                            src={product.image_url || 'https://via.placeholder.com/400x400?text=No+Image'}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
                        <p className="text-3xl text-primary font-bold mb-6">
                            {totalPrice.toLocaleString('vi-VN')} ₫
                        </p>

                        {product.calories && (
                            <p className="text-gray-600 mb-2">🔥 Calories: {product.calories} kcal</p>
                        )}
                        {product.preparation_time && (
                            <p className="text-gray-600 mb-6">⏱️ Prep time: ~{Math.floor(product.preparation_time / 60)} minutes</p>
                        )}

                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-3">Customize Your Drink:</h3>
                                <div className="space-y-4">
                                    {['SIZE', 'ICE', 'SUGAR'].map((type) => {
                                        const typeVariants = product.variants?.filter((v) => v.variant_type === type);
                                        if (!typeVariants || typeVariants.length === 0) return null;
                                        return (
                                            <div key={type}>
                                                <p className="text-sm font-medium text-gray-700 mb-2">{type}:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {typeVariants.map((variant) => {
                                                        const isSelected = selectedVariants.some((v) => v.variant_id === variant.variant_id);
                                                        return (
                                                            <button
                                                                key={variant.variant_id}
                                                                onClick={() => toggleVariant(variant)}
                                                                className={`px-4 py-2 rounded-lg border transition-colors ${isSelected
                                                                        ? 'bg-primary text-white border-primary'
                                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                                                                    }`}
                                                            >
                                                                {variant.variant_name}
                                                                {variant.price_adjustment > 0 && ` (+${variant.price_adjustment.toLocaleString('vi-VN')}₫)`}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block font-semibold text-lg mb-3">Quantity:</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 text-xl font-bold"
                                >
                                    -
                                </button>
                                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 text-xl font-bold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.is_available}
                            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
                        >
                            {product.is_available ? `Add to Cart - ${(totalPrice * quantity).toLocaleString('vi-VN')} ₫` : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
