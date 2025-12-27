import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

export default function SearchResults() {
  const { searchResults, searchQuery } = useSearch();

  if (!searchQuery) {
    return null;
  }

  if (searchResults.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          No results found for "{searchQuery}"
        </h2>
        <p className="text-gray-600">
          Try checking your spelling or using different keywords
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Search results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-secondary">
                  {Math.floor((product.price - 300) / 50) + 1} diamonds
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  4.5 <Star size={14} className="inline" />
                </span>
                <span className="text-gray-500 text-sm">{product.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}