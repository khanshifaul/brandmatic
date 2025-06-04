'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartDiscount,
  selectCartGrandTotal,
  selectIsCartOpen,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  closeCart,
} from '@/lib/features/cart/cartSlice';
import { TCartItem } from '@/types/cart';
import Image from 'next/image';
import { formatPrice } from '@/utils/format';

export default function ShoppingCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const tax = useAppSelector(selectCartTax);
  const shipping = useAppSelector(selectCartShipping);
  const discount = useAppSelector(selectCartDiscount);
  const total = useAppSelector(selectCartGrandTotal);
  const isOpen = useAppSelector(selectIsCartOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 rounded-md hover:bg-background-subtle"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 16rem)' }}>
          {items.length === 0 ? (
            <div className="text-center text-foreground-muted py-8">
              Your cart is empty
            </div>
          ) : (
            items.map((item: TCartItem) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 bg-background-subtle rounded-lg"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image.image.secure_url}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-foreground-muted">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                  {item.variant && (
                    <p className="text-sm text-foreground-muted">
                      Variant: {item.variant.name}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.productId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="p-1 rounded-md hover:bg-background-subtle"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.productId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="p-1 rounded-md hover:bg-background-subtle"
                      disabled={item.quantity >= item.maxStock}
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeItem(item.productId))}
                      className="ml-auto p-1 text-error hover:bg-error/10 rounded-md"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-success">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="flex-1 px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  // Handle checkout
                  alert('Checkout not implemented yet');
                }}
                className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                disabled={items.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 