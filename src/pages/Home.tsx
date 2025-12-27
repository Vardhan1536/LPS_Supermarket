import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp } from 'lucide-react';
import ProductDetails from '../components/ProductDetails';

const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 599,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 399,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Designer Handbag',
    price: 799,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
    category: 'Fashion'
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 349,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Sports'
  }
];

const categories = [
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80' },
  { id: 'sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80' },
  { id: 'home', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80' }
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent flex items-center">
          <div className="text-white p-12">
            <h1 className="text-4xl font-bold mb-4">Summer Sale is Live!</h1>
            <p className="text-xl mb-6">Up to 70% off on selected items</p>
            <Link to="/categories" className="btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/categories" className="text-secondary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group relative h-48 rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="text-white text-xl font-semibold p-4">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-secondary" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              product={product}
              to={`/product/${product.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
                    <span>{product.rating}</span>
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-gray-500">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">₹{product.price}</span>
                  {product.price >= 300 && (
                    <span className="text-xs text-secondary">
                      Earn {Math.floor((product.price - 300) / 50) + 1} diamonds
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}