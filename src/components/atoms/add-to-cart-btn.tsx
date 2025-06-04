'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { useAppDispatch } from '@/lib/store';
import { addItem } from '@/lib/features/cart/cartSlice';
import { Product } from '@/types/product';
import { cn } from '@/utils/cn';
import { FiShoppingCart } from 'react-icons/fi';

interface AddToCartBtnProps {
  product: Product;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function AddToCartBtn({ 
  product, 
  variant = 'default',
  size = 'default',
  className 
}: AddToCartBtnProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      dispatch(addItem({
        productId: product._id,
        name: product.name,
        price: Number(product.variantsId[0]?.selling_price || 0),
        image: {
          _id: product.images[0]._id,
          image: product.images[0].image,
        },
        quantity: 1,
        maxStock: product.total_stock,
        variant: product.variantsId[0] ? {
          _id: product.variantsId[0]._id,
          name: product.variantsId[0].name,
          selling_price: product.variantsId[0].selling_price,
          variants_stock: product.variantsId[0].variants_stock,
        } : undefined,
      }));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      disabled={product.total_stock <= 0 || isLoading}
      className={cn(
        'gap-2',
        className
      )}
    >
      <FiShoppingCart className="h-4 w-4" />
      {product.total_stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  );
} 