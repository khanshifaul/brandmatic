'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { fetchProducts } from '@/lib/redux/features/products/productsSlice';
import { addItem } from '@/lib/redux/features/cart/cartSlice';
import Image from 'next/image';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading products...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-error">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-background-subtle rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-foreground-muted mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => dispatch(addItem({
                      ...product,
                      quantity: 1
                    }))}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 