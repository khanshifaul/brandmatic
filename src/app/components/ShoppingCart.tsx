'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/store';
import { removeItem, updateQuantity, toggleCart } from '@/lib/redux/features/cart/cartSlice';
import Image from 'next/image';

export default function ShoppingCart() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border-default">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Shopping Cart</h2>
              <button
                onClick={() => dispatch(toggleCart())}
                className="text-foreground-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-foreground-muted">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-background-subtle p-4 rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-foreground-muted">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="text-foreground-muted hover:text-foreground"
                        >
                          -
                        </button>
                        <span className="text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="text-foreground-muted hover:text-foreground"
                        >
                          +
                        </button>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="ml-auto text-error hover:text-error-dark"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border-default p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full bg-primary text-white py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 