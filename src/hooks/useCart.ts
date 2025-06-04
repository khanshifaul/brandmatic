"use client";
// src/hooks/useCart.ts
import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
  selectCartItems,
  selectCartItemCount,
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
  toggleCart,
} from '@/lib/features/cart/cartSlice';
import { TCartItem } from '@/types/cart';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const tax = useAppSelector(selectCartTax);
  const shipping = useAppSelector(selectCartShipping);
  const discount = useAppSelector(selectCartDiscount);
  const total = useAppSelector(selectCartGrandTotal);
  const isOpen = useAppSelector(selectIsCartOpen);

  return {
    items,
    itemCount,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    isOpen,
    addItem: (item: TCartItem) => dispatch(addItem(item)),
    removeItem: (id: string) => dispatch(removeItem(id)),
    updateQuantity: (id: string, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    toggleCart: () => dispatch(toggleCart()),
  };
}
