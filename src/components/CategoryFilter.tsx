import React from 'react';

interface CategoryFilterProps {
    categories: Array<{ category_id: string; name: string }>;
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            <button
                onClick={() => onSelectCategory('')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === ''
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.category_id}
                    onClick={() => onSelectCategory(cat.category_id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat.category_id
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};
