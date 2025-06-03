import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    description: 'High-quality cotton t-shirt with a modern fit',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing'
  },
  {
    id: '2',
    name: 'Classic Denim Jeans',
    description: 'Timeless denim jeans with perfect comfort',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    category: 'clothing'
  },
  {
    id: '3',
    name: 'Leather Backpack',
    description: 'Stylish and durable leather backpack for everyday use',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'accessories'
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: 'electronics'
  },
  {
    id: '5',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    category: 'electronics'
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Comfortable and lightweight running shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'footwear'
  },
  {
    id: '7',
    name: 'Sunglasses',
    description: 'UV-protected stylish sunglasses',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'accessories'
  },
  {
    id: '8',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'accessories'
  }
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(mockProducts);
} 