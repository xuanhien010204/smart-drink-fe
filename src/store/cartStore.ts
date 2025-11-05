import { create } from 'zustand';
import type { CartItem, Promotion } from '@/types';

interface CartState {
    items: CartItem[];
    promo: Promotion | null;
    addItem: (item: CartItem) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, qty: number) => void;
    applyPromo: (promo: Promotion) => void;
    clearCart: () => void;
    getSubtotal: () => number;
    getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    promo: null,

    addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.productId === item.productId);
        if (existing) {
            return {
                items: state.items.map((i) =>
                    i.productId === item.productId
                        ? { ...i, qty: i.qty + item.qty, subtotal: (i.qty + item.qty) * i.unit_price }
                        : i
                ),
            };
        }
        return { items: [...state.items, item] };
    }),

    removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
    })),

    updateQuantity: (productId, qty) => set((state) => {
        if (qty <= 0) {
            return { items: state.items.filter((i) => i.productId !== productId) };
        }
        return {
            items: state.items.map((i) =>
                i.productId === productId ? { ...i, qty, subtotal: qty * i.unit_price } : i
            ),
        };
    }),

    applyPromo: (promo) => set({ promo }),

    clearCart: () => set({ items: [], promo: null }),

    getSubtotal: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.subtotal, 0);
    },

    getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        if (!state.promo) return subtotal;

        if (state.promo.promotion_type === 'PERCENTAGE') {
            return subtotal * (1 - state.promo.discount_value / 100);
        }
        return Math.max(0, subtotal - state.promo.discount_value);
    },
}));
