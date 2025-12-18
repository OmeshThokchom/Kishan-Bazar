// Kisaan Bazaar Types

export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  category: ProductCategory;
  price: number;
  unit: 'kg' | 'quintal' | 'ton' | 'piece' | 'dozen';
  quantity: number;
  quality: 'premium' | 'good' | 'standard';
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  distance?: number;
  rating: number;
  reviews: number;
  aiQualityScore?: number;
  suggestedPrice?: number;
  createdAt: Date;
  available: boolean;
}

export type ProductCategory = 
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'pulses'
  | 'spices'
  | 'dairy'
  | 'flowers'
  | 'seeds';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  nameHindi: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  type: 'farmer' | 'buyer' | 'both';
  rating: number;
  verified: boolean;
  profileImage?: string;
  joinedAt: Date;
}

export interface Order {
  id: string;
  productId: string;
  product: Product;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'upi' | 'cod' | 'bank';
  createdAt: Date;
  updatedAt: Date;
  deliveryDate?: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface MandiPrice {
  id: string;
  productName: string;
  category: ProductCategory;
  mandiName: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  date: Date;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface CropAdvisory {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  category: 'pest' | 'disease' | 'weather' | 'fertilizer' | 'harvest';
  crop: string;
  severity: 'low' | 'medium' | 'high';
  solution: string;
  imageUrl?: string;
}

export interface VoiceCommand {
  text: string;
  intent: 'search' | 'sell' | 'buy' | 'price' | 'help' | 'navigate';
  entities?: Record<string, string>;
  confidence: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}
