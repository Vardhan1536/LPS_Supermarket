import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl backdrop-blur-sm max-w-2xl w-full text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <ShoppingBag size={48} className="text-secondary" />
          <h1 className="text-4xl font-bold text-secondary">Global Mart</h1>
        </div>
        <p className="text-xl text-gray-700 mb-8">
          Welcome to your one-stop destination for all your shopping needs.
          Discover amazing products at incredible prices!
        </p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    </div>
  );
}