import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const AdminNav: React.FC = () => {
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        window.location.href = '/admin/login';
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/admin" className="text-xl font-bold">
                        SmartDrink Admin
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/admin" className="hover:text-gray-300 transition-colors">
                            Dashboard
                        </Link>
                        <Link to="/admin/products" className="hover:text-gray-300 transition-colors">
                            Products
                        </Link>
                        <Link to="/admin/promotions" className="hover:text-gray-300 transition-colors">
                            Promotions
                        </Link>
                        <Link to="/admin/orders" className="hover:text-gray-300 transition-colors">
                            Orders
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
