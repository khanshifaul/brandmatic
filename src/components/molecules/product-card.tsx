'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/atoms/button';
import { AddToCartBtn } from '../atoms/add-to-cart-btn';
import { formatPrice } from '@/utils/format';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="group relative bg-background rounded-lg shadow-sm">
        <div className="aspect-square rounded-t-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="p-4">
          <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-background rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`} className="block aspect-square overflow-hidden rounded-t-lg">
        <div className="relative h-full w-full">
          <Image
            src={product.images[0].image.secure_url}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-sm font-medium text-foreground">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-medium text-foreground">
            {product.variantsId && product.variantsId.length > 0 
              ? `${formatPrice(Number(product.variantsId[0].selling_price))} - ${formatPrice(Number(product.variantsId[product.variantsId.length - 1].selling_price))}`
              : formatPrice(Number(product.price))}
          </span>
          <AddToCartBtn 
            product={product}
            variant="outline"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
} 