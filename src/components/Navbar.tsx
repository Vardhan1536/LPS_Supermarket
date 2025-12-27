import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  User,
  Diamond,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, performSearch } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2">
            <ShoppingBag className="text-secondary" />
            <span className="font-bold text-xl text-secondary">Global Mart</span>
          </Link>

          <div className="flex-1 max-w-xl mx-8" ref={searchRef}>
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                           focus:ring-primary focus:border-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/categories" className="hover:text-secondary">
              Categories
            </Link>
            
            <div className="flex items-center gap-2">
              <Diamond className="text-secondary" size={20} />
              <span className="font-semibold">{user?.diamonds || 0}</span>
            </div>

            <Link to="/cart" className="hover:text-secondary">
              <ShoppingCart />
            </Link>

            <Link to="/account" className="hover:text-secondary">
              <User />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}