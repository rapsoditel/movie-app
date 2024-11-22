import React from 'react';

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string
}

const categories = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="flex space-x-4 my-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          className={`py-2 px-4 rounded hover:bg-opacity-80 min-w-fit ${selectedCategory === category.value? 'bg-white text-gray-700': 'bg-gray-700 text-white'}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
