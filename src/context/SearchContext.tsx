import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface SearchContextType {
  searchResults: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// This would typically come from an API
const allProducts = [
  {
    id: 'm1',
    name: 'iPhone 15 Pro',
    price: 129999,
    category: 'Mobiles',
    description: 'The most powerful iPhone ever',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80'
  },
  {
    id: 'l1',
    name: 'MacBook Air M2',
    price: 114999,
    category: 'Laptops',
    description: 'Supercharged by M2',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80'
  },
  {
    id: 'w1',
    name: 'Apple Watch Series 9',
    price: 41999,
    category: 'Watches',
    description: 'Advanced health features',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80'
  }
  // Add more products here
];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
    
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider value={{ searchResults, searchQuery, setSearchQuery, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}