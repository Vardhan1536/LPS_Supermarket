import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, Package, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: selectedVariant?.price || product.price,
      variant: selectedVariant?.name,
      color: selectedColor?.name
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-secondary' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-4">
            <button className="btn-secondary flex-1">
              <span className="flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </span>
            </button>
            <button className="btn-secondary flex-1">
              <span className="flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share
              </span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {product.rating} <Star size={14} className="inline" />
                </span>
                <span className="text-gray-500">{product.reviews} reviews</span>
              </div>
              <span className="text-gray-500">Brand: {product.brand}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-bold">
              ₹{(selectedVariant?.price || product.price).toLocaleString()}
            </div>
            {(selectedVariant?.price || product.price) >= 300 && (
              <div className="text-secondary">
                Earn {Math.floor(((selectedVariant?.price || product.price) - 300) / 50) + 1} diamonds
              </div>
            )}
          </div>

          {/* Variants */}
          {product.variants && (
            <div>
              <h3 className="font-semibold mb-2">Storage</h3>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border-2 ${
                      selectedVariant?.id === variant.id
                        ? 'border-secondary bg-secondary/10'
                        : 'border-gray-200'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && (
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor?.id === color.id ? 'border-secondary' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {product.highlights && (
            <div>
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="text-green-600" size={20} />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="text-blue-600" size={20} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="text-orange-600" size={20} />
              <span>7 Day Replacement</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="btn-secondary flex-1 py-3">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-primary flex-1 py-3">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Specifications</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-gray-600">{key}</dt>
                  <dd className="font-medium mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}