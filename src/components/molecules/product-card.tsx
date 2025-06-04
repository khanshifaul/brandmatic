'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Button } from '@/components/atoms/button';
import { AddToCartBtn } from '@/components/atoms/add-to-cart-btn';
import { formatPrice } from '@/utils/format';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/atoms/badge';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOutOfStock = product.total_stock <= 0;
  const hasVariants = product.variantsId && product.variantsId.length > 0;
  const priceRange = hasVariants ? {
    min: Math.min(...product.variantsId.map(v => Number(v.selling_price))),
    max: Math.max(...product.variantsId.map(v => Number(v.selling_price)))
  } : null;

  if (!mounted) {
    return (
      <div className={cn(
        "group relative bg-background rounded-lg shadow-sm",
        className
      )}>
        <div className="aspect-square rounded-t-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="p-4">
          <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "group relative bg-background rounded-lg shadow-sm hover:shadow-lg transition-shadow",
      className
    )}>
      <Link href={`/products/${product._id}`} className="block aspect-square overflow-hidden rounded-t-lg">
        <div className="relative h-full w-full">
          {product.images?.[0]?.image?.secure_url ? (
            <Image
              src={product.images[0].image.secure_url}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">No image</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="red" className="text-sm font-medium">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.featured && (
            <Badge variant="blue" className="absolute top-2 right-2">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product._id}`} className="block">
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-lg font-medium text-foreground">
              {hasVariants 
                ? `${formatPrice(priceRange!.min)} - ${formatPrice(priceRange!.max)}`
                : formatPrice(Number(product.price))}
            </span>
            {product.total_stock > 0 && (
              <p className="text-xs text-muted-foreground">
                {product.total_stock} in stock
              </p>
            )}
          </div>
          <AddToCartBtn 
            product={product}
            variant="outline"
            size="sm"
            isDisabled={isOutOfStock}
          />
        </div>
      </div>
    </div>
  );
} 