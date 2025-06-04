'use client';

import { Button, ButtonProps } from '@/components/atoms/button';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/lib/store';
import { addItem } from '@/lib/features/cart/cartSlice';
import { useState } from 'react';

export interface AddToCartBtnProps extends Omit<ButtonProps, 'onClick'> {
  product: Product;
  quantity?: number;
  isDisabled?: boolean;
}

export function AddToCartBtn({ product, quantity = 1, isDisabled, ...props }: AddToCartBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      dispatch(addItem({
        productId: product._id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || { _id: '', image: { secure_url: '', public_id: '' } },
        quantity,
        maxStock: product.total_stock,
      }));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
} 