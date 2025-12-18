import { Product, CategoryInfo, User, Order, MandiPrice, CropAdvisory } from '@/types';
import tomatoesImg from '@/assets/tomatoes.jpg';
import wheatImg from '@/assets/wheat.jpg';
import mangoesImg from '@/assets/mangoes.jpg';
import onionsImg from '@/assets/onions.jpg';
import riceImg from '@/assets/rice.jpg';
import chilliImg from '@/assets/chilli.jpg';
import potatoesImg from '@/assets/potatoes.jpg';
import marigoldImg from '@/assets/marigold.jpg';

export const categories: CategoryInfo[] = [
  { id: 'vegetables', name: 'Vegetables', nameHindi: 'सब्जियां', icon: '🥬', color: 'primary', gradient: 'from-primary to-primary-light' },
  { id: 'fruits', name: 'Fruits', nameHindi: 'फल', icon: '🍎', color: 'destructive', gradient: 'from-red-500 to-orange-400' },
  { id: 'grains', name: 'Grains', nameHindi: 'अनाज', icon: '🌾', color: 'secondary', gradient: 'from-secondary to-secondary-light' },
  { id: 'pulses', name: 'Pulses', nameHindi: 'दालें', icon: '🫘', color: 'accent', gradient: 'from-amber-600 to-amber-400' },
  { id: 'spices', name: 'Spices', nameHindi: 'मसाले', icon: '🌶️', color: 'destructive', gradient: 'from-red-600 to-red-400' },
  { id: 'dairy', name: 'Dairy', nameHindi: 'डेयरी', icon: '🥛', color: 'buyer', gradient: 'from-blue-400 to-cyan-300' },
  { id: 'flowers', name: 'Flowers', nameHindi: 'फूल', icon: '🌸', color: 'ai', gradient: 'from-pink-500 to-rose-400' },
  { id: 'seeds', name: 'Seeds', nameHindi: 'बीज', icon: '🌱', color: 'primary', gradient: 'from-emerald-600 to-green-400' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', nameHindi: 'ताजा टमाटर', category: 'vegetables', price: 45, unit: 'kg', quantity: 500, quality: 'premium', images: [tomatoesImg], sellerId: 'f1', sellerName: 'Ramesh Kumar', sellerLocation: 'Nashik, Maharashtra', distance: 12, rating: 4.8, reviews: 156, aiQualityScore: 92, suggestedPrice: 48, createdAt: new Date('2024-01-15'), available: true },
  { id: '2', name: 'Organic Wheat', nameHindi: 'जैविक गेहूं', category: 'grains', price: 2800, unit: 'quintal', quantity: 50, quality: 'premium', images: [wheatImg], sellerId: 'f2', sellerName: 'Suresh Singh', sellerLocation: 'Indore, MP', distance: 45, rating: 4.9, reviews: 89, aiQualityScore: 95, suggestedPrice: 2900, createdAt: new Date('2024-01-14'), available: true },
  { id: '3', name: 'Alphonso Mangoes', nameHindi: 'अल्फांसो आम', category: 'fruits', price: 350, unit: 'dozen', quantity: 200, quality: 'premium', images: [mangoesImg], sellerId: 'f3', sellerName: 'Priya Patil', sellerLocation: 'Ratnagiri, Maharashtra', distance: 85, rating: 4.7, reviews: 234, aiQualityScore: 88, suggestedPrice: 380, createdAt: new Date('2024-01-13'), available: true },
  { id: '4', name: 'Fresh Onions', nameHindi: 'ताजा प्याज', category: 'vegetables', price: 35, unit: 'kg', quantity: 1000, quality: 'good', images: [onionsImg], sellerId: 'f4', sellerName: 'Anil Sharma', sellerLocation: 'Lasalgaon, Maharashtra', distance: 28, rating: 4.5, reviews: 312, aiQualityScore: 85, suggestedPrice: 38, createdAt: new Date('2024-01-12'), available: true },
  { id: '5', name: 'Basmati Rice', nameHindi: 'बासमती चावल', category: 'grains', price: 8500, unit: 'quintal', quantity: 30, quality: 'premium', images: [riceImg], sellerId: 'f5', sellerName: 'Gurpreet Kaur', sellerLocation: 'Karnal, Haryana', distance: 120, rating: 4.9, reviews: 178, aiQualityScore: 96, suggestedPrice: 8800, createdAt: new Date('2024-01-11'), available: true },
  { id: '6', name: 'Red Chilli', nameHindi: 'लाल मिर्च', category: 'spices', price: 180, unit: 'kg', quantity: 150, quality: 'good', images: [chilliImg], sellerId: 'f6', sellerName: 'Venkat Rao', sellerLocation: 'Guntur, AP', distance: 350, rating: 4.6, reviews: 98, aiQualityScore: 82, suggestedPrice: 190, createdAt: new Date('2024-01-10'), available: true },
  { id: '7', name: 'Fresh Potatoes', nameHindi: 'ताजा आलू', category: 'vegetables', price: 25, unit: 'kg', quantity: 2000, quality: 'standard', images: [potatoesImg], sellerId: 'f7', sellerName: 'Raj Verma', sellerLocation: 'Agra, UP', distance: 65, rating: 4.3, reviews: 445, aiQualityScore: 78, suggestedPrice: 28, createdAt: new Date('2024-01-09'), available: true },
  { id: '8', name: 'Marigold Flowers', nameHindi: 'गेंदा फूल', category: 'flowers', price: 80, unit: 'kg', quantity: 100, quality: 'premium', images: [marigoldImg], sellerId: 'f8', sellerName: 'Lakshmi Devi', sellerLocation: 'Bangalore, Karnataka', distance: 15, rating: 4.8, reviews: 67, aiQualityScore: 90, suggestedPrice: 85, createdAt: new Date('2024-01-08'), available: true },
];

export const mockUser: User = { id: 'u1', name: 'Rajesh Patel', phone: '+91 98765 43210', location: 'Anand', district: 'Anand', state: 'Gujarat', type: 'farmer', rating: 4.7, verified: true, joinedAt: new Date('2023-06-15') };

export const mockOrders: Order[] = [
  { id: 'o1', productId: '1', product: mockProducts[0], buyerId: 'b1', buyerName: 'Krishna Traders', sellerId: 'u1', quantity: 100, totalPrice: 4500, status: 'confirmed', paymentStatus: 'pending', paymentMethod: 'upi', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-01-15'), deliveryDate: new Date('2024-01-18') },
  { id: 'o2', productId: '4', product: mockProducts[3], buyerId: 'b2', buyerName: 'Fresh Mart', sellerId: 'u1', quantity: 200, totalPrice: 7000, status: 'shipped', paymentStatus: 'completed', paymentMethod: 'bank', createdAt: new Date('2024-01-14'), updatedAt: new Date('2024-01-16'), deliveryDate: new Date('2024-01-17') },
  { id: 'o3', productId: '7', product: mockProducts[6], buyerId: 'b3', buyerName: 'Vegetable World', sellerId: 'u1', quantity: 500, totalPrice: 12500, status: 'delivered', paymentStatus: 'completed', paymentMethod: 'cod', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-01-13'), deliveryDate: new Date('2024-01-13') },
];

export const mockMandiPrices: MandiPrice[] = [
  { id: 'm1', productName: 'Tomato', category: 'vegetables', mandiName: 'Azadpur Mandi', location: 'Delhi', minPrice: 35, maxPrice: 55, modalPrice: 45, unit: 'kg', date: new Date(), trend: 'up', changePercent: 8.5 },
  { id: 'm2', productName: 'Onion', category: 'vegetables', mandiName: 'Lasalgaon Mandi', location: 'Maharashtra', minPrice: 28, maxPrice: 42, modalPrice: 35, unit: 'kg', date: new Date(), trend: 'down', changePercent: -5.2 },
  { id: 'm3', productName: 'Wheat', category: 'grains', mandiName: 'Hapur Mandi', location: 'UP', minPrice: 2600, maxPrice: 3000, modalPrice: 2800, unit: 'quintal', date: new Date(), trend: 'stable', changePercent: 0.5 },
  { id: 'm4', productName: 'Potato', category: 'vegetables', mandiName: 'Agra Mandi', location: 'UP', minPrice: 20, maxPrice: 30, modalPrice: 25, unit: 'kg', date: new Date(), trend: 'down', changePercent: -3.8 },
  { id: 'm5', productName: 'Rice', category: 'grains', mandiName: 'Karnal Mandi', location: 'Haryana', minPrice: 8000, maxPrice: 9000, modalPrice: 8500, unit: 'quintal', date: new Date(), trend: 'up', changePercent: 4.2 },
];

export const mockAdvisories: CropAdvisory[] = [
  { id: 'a1', title: 'Tomato Leaf Curl Alert', titleHindi: 'टमाटर पत्ती मरोड़ अलर्ट', description: 'High risk of leaf curl virus in tomato crops this week.', category: 'disease', crop: 'Tomato', severity: 'high', solution: 'Spray Imidacloprid 17.8 SL @ 0.3ml/litre water.' },
  { id: 'a2', title: 'Rain Expected', titleHindi: 'बारिश की संभावना', description: 'Heavy rainfall expected in next 48 hours.', category: 'weather', crop: 'All', severity: 'medium', solution: 'Cover harvested produce. Ensure proper drainage.' },
  { id: 'a3', title: 'Best Time to Apply Urea', titleHindi: 'यूरिया डालने का सही समय', description: 'Ideal conditions for nitrogen application.', category: 'fertilizer', crop: 'Wheat', severity: 'low', solution: 'Apply 30kg Urea per acre in morning or evening.' },
];

export const languages = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];
