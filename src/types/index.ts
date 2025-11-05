export interface User {
    user_id: string;
    email: string;
    full_name: string;
    role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
    is_verified: boolean;
    created_at: string;
}

export interface Category {
    category_id: string;
    name: string;
    image_url: string;
}

export interface Variant {
    variant_id: string;
    variant_name: string;
    variant_type: 'SIZE' | 'ICE' | 'SUGAR';
    price_adjustment: number;
}

export interface Product {
    product_id: string;
    category_id: string;
    name: string;
    base_price: number;
    image_url?: string;
    is_available: boolean;
    calories?: number;
    preparation_time: number;
    tags?: string[];
    ingredients?: Record<string, string>;
    variants?: Variant[];
}

export interface CartItem {
    productId: string;
    name: string;
    qty: number;
    unit_price: number;
    variants?: Variant[];
    subtotal: number;
}

export interface Promotion {
    promotion_id: string;
    code: string;
    promotion_type: 'PERCENTAGE' | 'FIXED';
    discount_value: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

export interface Order {
    order_id: string;
    order_code: string;
    customer_id?: string;
    order_status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
    subtotal: number;
    total_amount: number;
    items?: OrderItem[];
    created_at: string;
}

export interface OrderItem {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    variants?: string[];
}

export interface PaymentQR {
    qr_code_url: string;
    expires_at: string;
    transaction_id: string;
}

export interface PaymentStatus {
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    transaction_id: string;
}
