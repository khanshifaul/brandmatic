"use client";

import { ProductCard } from "@/components/molecules/product-card";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?featured=true");
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!mounted) {
    return (
      <section className='py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Featured Products</h2>
          <p className='text-muted-foreground'>Discover our handpicked selection of premium items</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className='h-[300px] bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary-dark)] rounded-lg animate-pulse'
              />
            ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Featured Products</h2>
          <p className='text-error'>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16'>
      <div className='text-center mb-12'>
        <motion.h2
          className='text-3xl font-bold mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        <motion.p
          className='text-muted-foreground'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our handpicked selection of premium items
        </motion.p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className='h-[300px] bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary-dark)] rounded-lg animate-pulse'
                />
              ))
          : products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
