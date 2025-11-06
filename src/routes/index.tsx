import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Kiosk Pages
import { KioskHome } from '@/pages/KioskHome';
import { MenuPage } from '@/pages/MenuPage';
import { ProductDetail } from '@/pages/ProductDetail';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderStatus } from '@/pages/OrderStatus';
import { FaceScanPage } from '@/pages/FaceScanPage';

// Admin Pages
import { AdminLogin } from '@/pages/AdminLogin';
import { AdminDashboard } from '@/pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Kiosk Routes */}
                <Route path="/" element={<KioskHome />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:id" element={<OrderStatus />} />
                <Route path="/face-scan" element={<FaceScanPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Products Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/promotions"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Promotions Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Orders Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Users Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/kiosks"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Kiosks Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/inventory"
                    element={
                        <ProtectedRoute>
                            <div className="p-8 text-center text-2xl">Inventory Management - Coming Soon</div>
                        </ProtectedRoute>
                    }
                />

                {/* 404 Route */}
                <Route path="*" element={<div className="p-8 text-center text-2xl">404 - Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
};
