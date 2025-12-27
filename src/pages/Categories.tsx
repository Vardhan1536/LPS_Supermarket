import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Filter } from 'lucide-react';

const categories = [
  { id: 'mobiles', name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { id: 'laptops', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80' },
  { id: 'clothes', name: 'Clothes', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80' },
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { id: 'furniture', name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
  { id: 'beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
  { id: 'sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80' },
  { id: 'books', name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80' },
  { id: 'toys', name: 'Toys', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&q=80' },
  { id: 'home', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80' },
  { id: 'appliances', name: 'Appliances', image: 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=500&q=80' },
  { id: 'grocery', name: 'Grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },
  { id: 'footwear', name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80' }
];

const products = {
  mobiles: [
    {
      id: 'm1',
      name: 'iPhone 15 Pro',
      price: 129999,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80',
      brand: 'Apple'
    },
    {
      id: 'm2',
      name: 'Samsung Galaxy S24',
      price: 79999,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
      brand: 'Samsung'
    }
  ],
  laptops: [
    {
      id: 'l1',
      name: 'MacBook Air M2',
      price: 114999,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      brand: 'Apple'
    },
    {
      id: 'l2',
      name: 'Dell XPS 13',
      price: 89999,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
      brand: 'Dell'
    }
  ],
  watches: [
    {
      id: 'w1',
      name: 'Rolex Submariner',
      price: 850000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80',
      brand: 'Rolex'
    },
    {
      id: 'w2',
      name: 'Casio G-Shock',
      price: 8999,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1605561401148-74242765d018?w=500&q=80',
      brand: 'Casio'
    }
],
clothes: [
  {
    id: 'c1',
    name: 'Nike Hoodie',
    price: 4999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1585059895525-ace2b53b022b?w=500&q=80',
    brand: 'Nike'
  },
  {
    id: 'c2',
    name: 'Levi’s Denim Jacket',
    price: 6999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1616013097748-68e2874b3e5d?w=500&q=80',
    brand: 'Levi’s'
  }
],electronics: [
  {
    id: 'e1',
    name: 'Sony WH-1000XM5 Headphones',
    price: 29999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a0?w=500&q=80',
    brand: 'Sony'
  },
  {
    id: 'e2',
    name: 'Samsung Galaxy Tab S8',
    price: 58999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611186871348-d9c522cad5f8?w=500&q=80',
    brand: 'Samsung'
  }
],
furniture: [
  {
    id: 'f1',
    name: 'Ikea Study Table',
    price: 7999,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1598300187583-43a7c5e4d07c?w=500&q=80',
    brand: 'Ikea'
  },
  {
    id: 'f2',
    name: 'Wooden King Size Bed',
    price: 29999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1578897368665-d20fe33e3c4c?w=500&q=80',
    brand: 'HomeTown'
  }
],
beauty: [
  {
    id: 'b1',
    name: 'MAC Matte Lipstick',
    price: 1999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1605719946404-4552a182d59e?w=500&q=80',
    brand: 'MAC'
  },
  {
    id: 'b2',
    name: 'The Ordinary Niacinamide Serum',
    price: 1499,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719366144-0ef180812f23?w=500&q=80',
    brand: 'The Ordinary'
  }
],
sports: [
  {
    id: 's1',
    name: 'Adidas Football',
    price: 2999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1599058917213-d30244a3229a?w=500&q=80',
    brand: 'Adidas'
  },
  {
    id: 's2',
    name: 'Yonex Badminton Racket',
    price: 5999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1579722826176-0bc8475f40b4?w=500&q=80',
    brand: 'Yonex'
  }
],




};

export default function Categories() {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity');

  if (!category) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.id}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-center">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  const categoryProducts = products[category as keyof typeof products] || [];
  const brands = Array.from(new Set(categoryProducts.map(p => p.brand)));

  return (
    <div className="flex gap-6">
      {/* Filters */}
      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} />
            <h2 className="font-semibold">Filters</h2>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="200000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                      className="rounded text-secondary focus:ring-secondary"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/categories">Categories</Link>
              <ChevronRight size={16} />
              <span className="font-medium text-gray-900">
                {categories.find(c => c.id === category)?.name}
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryProducts.map((product) => (
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
                    {product.rating} ★
                  </span>
                  <span className="text-gray-500 text-sm">{product.brand}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 