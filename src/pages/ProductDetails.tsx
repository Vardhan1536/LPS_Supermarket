import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsComponent from '../components/ProductDetails';

// Sample products data - In a real app, this would come from an API
const products = {
  'm1': {
    id: 'm1',
    name: 'iPhone 15 Pro',
    price: 129999,
    rating: 4.7,
    reviews: 2834,
    brand: 'Apple',
    category: 'Mobiles',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&q=80',
      'https://images.unsplash.com/photo-1697644371824-41f1e7e9a140?w=500&q=80',
      'https://images.unsplash.com/photo-1697644371663-a11c895b844d?w=500&q=80'
    ],
    highlights: [
      'A17 Pro chip',
      'Titanium design',
      '48MP main camera',
      'USB-C connector',
      'All-day battery life'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A17 Pro chip',
      'Storage': '256GB',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '3274 mAh'
    },
    variants: [
      { id: 1, name: '128GB', price: 129999 },
      { id: 2, name: '256GB', price: 139999 },
      { id: 3, name: '512GB', price: 159999 }
    ],
    colors: [
      { id: 1, name: 'Natural Titanium', code: '#E4E4E0' },
      { id: 2, name: 'Blue Titanium', code: '#394E6E' },
      { id: 3, name: 'White Titanium', code: '#F5F5F0' },
      { id: 4, name: 'Black Titanium', code: '#4A4A4A' }
    ]
  },
  'm2': {
    id: 'm2',
    name: 'Samsung Galaxy S24',
    price: 79999,
    rating: 4.5,
    reviews: 1523,
    brand: 'Samsung',
    category: 'Mobiles',
    description: 'Experience the next level of mobile innovation with Galaxy AI.',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
      'https://images.unsplash.com/photo-1678911820864-e5c67e784b30?w=500&q=80'
    ],
    highlights: [
      'Snapdragon 8 Gen 3',
      'AI-powered features',
      '50MP main camera',
      'Dynamic AMOLED 2X',
      '4000mAh battery'
    ],
    specifications: {
      'Display': '6.2-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Battery': '4000 mAh'
    },
    variants: [
      { id: 1, name: '128GB', price: 79999 },
      { id: 2, name: '256GB', price: 89999 }
    ],
    colors: [
      { id: 1, name: 'Phantom Black', code: '#000000' },
      { id: 2, name: 'Cream', code: '#F5E6D3' },
      { id: 3, name: 'Violet', code: '#A5B4FF' }
    ]
  },
  'l1': {
    id: 'l1',
    name: 'MacBook Air M2',
    price: 114999,
    rating: 4.8,
    reviews: 1245,
    brand: 'Apple',
    category: 'Laptops',
    description: 'Supercharged by M2 chip for breakthrough performance and up to 18 hours of battery life.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80'
    ],
    highlights: [
      'Apple M2 chip',
      'Up to 18 hours battery life',
      '13.6-inch Liquid Retina display',
      'MagSafe charging',
      '1080p FaceTime HD camera'
    ],
    specifications: {
      'Display': '13.6-inch Liquid Retina',
      'Processor': 'Apple M2',
      'Memory': '8GB unified memory',
      'Storage': '256GB SSD',
      'Battery': 'Up to 18 hours'
    },
    variants: [
      { id: 1, name: '256GB', price: 114999 },
      { id: 2, name: '512GB', price: 134999 }
    ],
    colors: [
      { id: 1, name: 'Space Gray', code: '#666666' },
      { id: 2, name: 'Silver', code: '#E3E3E3' },
      { id: 3, name: 'Starlight', code: '#F3E5DC' },
      { id: 4, name: 'Midnight', code: '#1E1E1E' }
    ]
  },
  w1: {
    id: 'w1',
    name: 'Rolex Submariner',
    price: 850000,
    rating: 4.9,
    reviews: 1203,
    brand: 'Rolex',
    category: 'Watches',
    description: 'A luxury diving watch with an automatic movement and ceramic bezel.',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80',
      'https://images.unsplash.com/photo-1559563458-527698bf3267?w=500&q=80'
    ],
    highlights: [
      'Automatic Movement',
      'Water-resistant up to 300m',
      'Ceramic Bezel',
      'Scratch-resistant sapphire crystal'
    ],
    specifications: {
      'Movement': 'Automatic',
      'Material': 'Stainless Steel',
      'Water Resistance': '300m',
      'Dial': 'Black'
    },
    variants: [
      { id: 1, name: 'Black Dial', price: 850000 },
      { id: 2, name: 'Blue Dial', price: 870000 }
    ],
    colors: [
      { id: 1, name: 'Black', code: '#000000' },
      { id: 2, name: 'Blue', code: '#0000FF' }
    ]
  },
  c1: {
    id: 'c1',
    name: 'Nike Hoodie',
    price: 4999,
    rating: 4.7,
    reviews: 956,
    brand: 'Nike',
    category: 'Clothes',
    description: 'A comfortable and stylish hoodie perfect for casual wear.',
    images: [
      'https://images.unsplash.com/photo-1585059895525-ace2b53b022b?w=500&q=80',
      'https://images.unsplash.com/photo-1596755095361-d03a097111a5?w=500&q=80'
    ],
    highlights: [
      'Soft cotton blend',
      'Front kangaroo pocket',
      'Adjustable hood'
    ],
    specifications: {
      'Material': 'Cotton Blend',
      'Fit': 'Regular Fit',
      'Sleeve Length': 'Full Sleeve',
      'Wash Care': 'Machine Wash'
    },
    variants: [
      { id: 1, name: 'S', price: 4999 },
      { id: 2, name: 'M', price: 4999 },
      { id: 3, name: 'L', price: 4999 }
    ],
    colors: [
      { id: 1, name: 'Black', code: '#000000' },
      { id: 2, name: 'Grey', code: '#808080' }
    ]
  },
  e1: {
    id: 'e1',
    name: 'Sony WH-1000XM5 Headphones',
    price: 29999,
    rating: 4.8,
    reviews: 1345,
    brand: 'Sony',
    category: 'Electronics',
    description: 'Industry-leading noise-canceling headphones with immersive sound quality.',
    images: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a0?w=500&q=80',
      'https://images.unsplash.com/photo-1611847038529-6c5f479c7f5e?w=500&q=80'
    ],
    highlights: [
      'Adaptive noise cancellation',
      'Up to 30 hours battery life',
      'Touch controls'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Battery Life': '30 hours',
      'Charging': 'USB-C',
      'Connectivity': 'Bluetooth 5.2'
    },
    variants: [
      { id: 1, name: 'Black', price: 29999 },
      { id: 2, name: 'Silver', price: 29999 }
    ],
    colors: [
      { id: 1, name: 'Black', code: '#000000' },
      { id: 2, name: 'Silver', code: '#C0C0C0' }
    ]
  },
  f1: {
    id: 'f1',
    name: 'Ikea Study Table',
    price: 7999,
    rating: 4.5,
    reviews: 876,
    brand: 'Ikea',
    category: 'Furniture',
    description: 'A sleek and modern study table with durable wood finish.',
    images: [
      'https://images.unsplash.com/photo-1598300187583-43a7c5e4d07c?w=500&q=80',
      'https://images.unsplash.com/photo-1592151529787-5932b6579923?w=500&q=80'
    ],
    highlights: [
      'Durable wood finish',
      'Spacious surface',
      'Modern design'
    ],
    specifications: {
      'Material': 'Engineered Wood',
      'Dimensions': '120 x 60 x 75 cm',
      'Weight': '15 kg',
      'Color': 'White'
    },
    variants: [
      { id: 1, name: 'White', price: 7999 },
      { id: 2, name: 'Brown', price: 8499 }
    ],
    colors: [
      { id: 1, name: 'White', code: '#FFFFFF' },
      { id: 2, name: 'Brown', code: '#8B4513' }
    ]
  },
  3: {
    id: 'c3',
    name: 'Designer Handbag',
    price: 799,
    rating: 4.7,
    reviews: 745,
    brand: 'Luxury Leather Co.',
    category: 'Fashion',
    description: 'A stylish and spacious designer handbag for every occasion.',
    images: [
      'https://media.istockphoto.com/id/1209693433/photo/vintage-style-grey-green-color-women-handbag-display-on-shelf.webp?a=1&b=1&s=612x612&w=0&k=20&c=JormMzNvYoPCi-BK8_YP1VkX_UM6KhtprLSZZWc7nZs=',
      'https://media.istockphoto.com/id/1159213603/photo/color-women-bag-display-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=QLY_55ujqjQpBD3mrDDW2D6jnhPpMX92neM0Sp992F4='],
    highlights: [
      'Durable wood finish',
      'Spacious surface',
      'Modern design'
    ],
    specifications: {
      'Material': 'Genuine Leather',
      'Strap Type': 'Adjustable',
      'Closure': 'Zipper',
      'Capacity': '15L'
    },
    variants: [
      { id: 1, name: 'Small', price: 699 },
      { id: 2, name: 'Medium', price: 799 },
      { id: 3, name: 'Large', price: 899 }
    ],
    colors: [
      { id: 1, name: 'Brown', code: '#A52A2A' },
      { id: 2, name: 'Black', code: '#000000' }
    ]
  },
  4: {
    id: 'c4',
    name: 'Running Shoes',
    price: 349,
    rating: 4.4,
    reviews: 1820,
    brand: 'SpeedRun',
    category: 'Sports',
    description: 'Lightweight and comfortable running shoes for daily workouts.',
    images: [
      'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    highlights: [
      'Breathable mesh upper',
      'Shock-absorbing sole',
      'Durable rubber outsole'
    ],
    specifications: {
      'Material': 'Mesh & Synthetic',
      'Closure': 'Lace-Up',
      'Sole Type': 'Rubber',
      'Usage': 'Running, Training'
    },
    variants: [
      { id: 1, name: 'UK 7', price: 349 },
      { id: 2, name: 'UK 8', price: 349 },
      { id: 3, name: 'UK 9', price: 349 }
    ],
    colors: [
      { id: 1, name: 'White', code: '#FFFFFF' },
      { id: 2, name: 'Grey', code: '#808080' }
    ]
  },
  2: {
    id: 'c2',
    name: 'Smart Fitness Watch',
    price: 399,
    rating: 4.3,
    reviews: 1024,
    brand: 'FitTech',
    category: 'Electronics',
    description: 'Track your health and fitness with this stylish smartwatch.',
    images: [
      'https://t4.ftcdn.net/jpg/07/38/79/69/240_F_738796984_iG5xqRJn8OeTTnzAP5Te9dJGjt2X7an7.jpg',
      'https://t3.ftcdn.net/jpg/05/89/20/84/240_F_589208452_jTxyYyu4DdPnVKFz2MBBb3nNs71ouyFo.jpg'
    ],
    highlights: [
      'Heart rate monitoring',
      'Step and calorie tracker',
      'Long battery life'
    ],
    specifications: {
      'Display': '1.3-inch LCD',
      'Battery Life': 'Up to 7 days',
      'Water Resistance': 'IP67',
      'Connectivity': 'Bluetooth 5.0'
    },
    variants: [
      { id: 1, name: 'Standard', price: 399 }
    ],
    colors: [
      { id: 1, name: 'Black', code: '#000000' },
      { id: 2, name: 'Blue', code: '#0000FF' }
    ]
  },
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <ProductDetailsComponent product={product} />;
}