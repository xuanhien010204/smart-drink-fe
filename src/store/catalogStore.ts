import { create } from 'zustand';
import type { Category, Product } from '@/types';

interface CatalogState {
    categories: Category[];
    products: Product[];
    selectedCategory: string;
    searchQuery: string;
    setCategories: (categories: Category[]) => void;
    setProducts: (products: Product[]) => void;
    setSelectedCategory: (categoryId: string) => void;
    setSearchQuery: (query: string) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
    categories: [],
    products: [],
    selectedCategory: '',
    searchQuery: '',
    setCategories: (categories) => set({ categories }),
    setProducts: (products) => set({ products }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
