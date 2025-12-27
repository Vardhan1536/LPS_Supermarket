export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  diamonds: number;
  addresses: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
}

export interface ProductColor {
  id: number;
  name: string;
  code: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  images?: string[];
  highlights?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  colors?: ProductColor[];
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed';
  address: Address;
  paymentMethod: string;
  date: string;
}