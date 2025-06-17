"use client";

import { Button } from "@/components/atoms/button";
import { CartItem } from "@/components/molecules/cart-item";
import { useBusiness } from "@/hooks/useBusiness";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function CartPage() {
  const { businessData } = useBusiness();
  const { items, itemCount, subtotal, shipping, total, removeItem, updateQuantity } = useCart();
  const currency = businessData?.currency?.[0] || "TK";

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Link href='/products' className='flex items-center text-primary hover:underline'>
          <FiArrowLeft className='mr-2' /> Continue Shopping
        </Link>
      </div>

      <h1 className='text-3xl font-bold mb-8'>Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className='text-center py-12'>
          <div className='bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          </div>
          <p className='text-xl mb-4'>Your cart is empty</p>
          <Button>
            <Link href='/products'>Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm divide-y dark:divide-gray-700'>
              {items.map((item: CartItemType) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onRemove={() => removeItem(item.productId)}
                  onQuantityChange={(quantity) => updateQuantity(item.productId, quantity)}
                  showQuantityControls
                />
              ))}
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 sticky top-4'>
              <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between'>
                  <span>Items ({itemCount})</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className='flex justify-between text-muted-foreground'>
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping, currency)}</span>
                </div>
              </div>

              <div className='flex justify-between text-lg font-bold border-t pt-4 mb-6'>
                <span>Total</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>

              <Button className='w-full' size='lg'>
                <Link href='/checkout'>Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
