import React from 'react';
import { Link } from 'react-router-dom';

export const TopNav: React.FC = () => {
    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        SmartDrink
                    </Link>
                    <div className="flex gap-6">
                        <Link to="/menu" className="hover:text-gray-200 transition-colors">
                            Menu
                        </Link>
                        <Link to="/cart" className="hover:text-gray-200 transition-colors">
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
