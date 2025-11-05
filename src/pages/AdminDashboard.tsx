import React from 'react';
import { Link } from 'react-router-dom';
import { AdminNav } from '@/components/AdminNav';

export const AdminDashboard: React.FC = () => {
    const stats = [
        { label: 'Total Orders Today', value: '48', color: 'bg-blue-500' },
        { label: 'Revenue Today', value: '2,340,000 ₫', color: 'bg-green-500' },
        { label: 'Active Products', value: '24', color: 'bg-purple-500' },
        { label: 'Active Kiosks', value: '5', color: 'bg-orange-500' },
    ];

    const quickLinks = [
        { title: 'Products Management', path: '/admin/products', icon: '🍹', desc: 'Manage menu items and variants' },
        { title: 'Promotions', path: '/admin/promotions', icon: '🎉', desc: 'Manage discounts and loyalty programs' },
        { title: 'Orders', path: '/admin/orders', icon: '📋', desc: 'View and manage orders' },
        { title: 'Users', path: '/admin/users', icon: '👥', desc: 'Manage customer accounts' },
        { title: 'Kiosks', path: '/admin/kiosks', icon: '🖥️', desc: 'Monitor kiosk status' },
        { title: 'Inventory', path: '/admin/inventory', icon: '📦', desc: 'Track inventory levels' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-lg shadow-lg p-6">
                            <div className={`${stat.color} w-12 h-12 rounded-lg mb-4`}></div>
                            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Links</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-4xl mb-3">{link.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{link.title}</h3>
                            <p className="text-gray-600">{link.desc}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-3">
                            <div>
                                <p className="font-semibold">Order #SD-2025048 completed</p>
                                <p className="text-sm text-gray-600">2 minutes ago</p>
                            </div>
                            <span className="text-green-600 font-semibold">45,000 ₫</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-3">
                            <div>
                                <p className="font-semibold">New product added: Berry Blast</p>
                                <p className="text-sm text-gray-600">15 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Kiosk-003 went online</p>
                                <p className="text-sm text-gray-600">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
