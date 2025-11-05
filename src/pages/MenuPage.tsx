import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { catalogApi } from '@/api/catalog';
import { useCatalogStore } from '@/store/catalogStore';
import type { Product } from '@/types';

export const MenuPage: React.FC = () => {
    const navigate = useNavigate();
    const { categories, products, selectedCategory, searchQuery, setCategories, setProducts, setSelectedCategory, setSearchQuery } = useCatalogStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    catalogApi.getProducts(),
                    catalogApi.getCategories(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error loading menu data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [setCategories, setProducts]);

    const filteredProducts = products.filter((p: Product) => {
        const matchesCategory = !selectedCategory || p.category_id === selectedCategory;
        const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50">
            <TopNav />

            {/* Hero Section */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-black mb-4 drop-shadow-lg">
                        🍹 Discover Our Menu
                    </h1>
                    <p className="text-xl opacity-90 mb-6">
                        Handcrafted beverages made with love, just for you
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="🔍 Search for your favorite drink..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white/20 transition-all text-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8 sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md py-4 -mx-4 px-4">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>

                {/* Stats */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="text-gray-700">
                        <span className="font-bold text-2xl text-blue-600">{filteredProducts.length}</span>
                        <span className="ml-2 text-lg">delicious drinks available</span>
                    </div>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory('')}
                            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                        >
                            ✕ Clear filter
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin text-6xl mb-4">☕</div>
                        <p className="text-2xl text-gray-600 font-semibold">Loading delicious drinks...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.product_id}
                                product={product}
                                onClick={() => navigate(`/product/${product.product_id}`)}
                            />
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6">😔</div>
                        <h3 className="text-3xl font-bold text-gray-700 mb-2">No drinks found</h3>
                        <p className="text-xl text-gray-500 mb-6">Try searching with different keywords</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('');
                            }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
                        >
                            Show All Drinks
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
