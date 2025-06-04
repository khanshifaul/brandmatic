// src/components/cartItem.tsx
"use client";

// import { TCartItem } from "@/lib/features/cart/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Button } from "../atoms/button";
import { TCartItem } from "@/types/cart";

interface CartItemProps {
  item: TCartItem;
  onRemove: () => void;
  onQuantityChange?: (quantity: number) => void;
  showQuantityControls?: boolean;
  currency?: string; // optional override
}

export function CartItem({
  item,
  onRemove,
  onQuantityChange,
  showQuantityControls = false,
  currency = "BDT",
}: CartItemProps) {
  const unitPrice = Number(item.price);
  const totalPrice = unitPrice * item.quantity;

  return (
    <div className='flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700'>
      {/* Product Image */}
      <div className='relative w-16 h-16 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800'>
        {item.image ? (
          <Image src={item.image.image.secure_url} alt={item.name} fill className='object-cover' sizes='64px' />
        ) : (
          <div className='bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center'>
            <span className='text-xs text-gray-500'>No Image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='flex-1 flex flex-col'>
        <div className='flex justify-between items-start'>
          {/* Name */}
          <h3 className='font-medium text-sm sm:text-base'>{item.name}</h3>
          {/* Line-total */}
          <div className='font-medium text-sm sm:text-base'>{formatCurrency(totalPrice, currency)}</div>
        </div>

        {/* Unit price × qty */}
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>
          {formatCurrency(unitPrice, currency)} × {item.quantity}
        </p>

        {/* Quantity Controls or Static Qty */}
        <div className='flex items-center justify-between mt-2'>
          {showQuantityControls && onQuantityChange ? (
            <div className='flex items-center gap-2'>
              <Button
                title='Decrease Quantity'
                variant='outline'
                className='h-8 w-8'
                onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                <FiMinus className='w-3 h-3' />
              </Button>

              <span className='text-sm w-8 text-center'>{item.quantity}</span>

              <Button
                title='Increase Quantity'
                variant='outline'
                className='h-8 w-8'
                onClick={() => onQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.maxStock}
              >
                <FiPlus className='w-3 h-3' />
              </Button>
            </div>
          ) : (
            <div className='text-xs text-gray-500'>Qty: {item.quantity}</div>
          )}

          {/* Remove */}
          <Button
            title='Remove Item'
            variant='ghost'
            className='text-destructive hover:bg-destructive/10'
            onClick={onRemove}
            aria-label='Remove item'
          >
            <FiTrash2 className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
