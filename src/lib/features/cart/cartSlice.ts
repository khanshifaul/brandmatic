import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { ProductImage } from "@/types/product";
import { CartItem } from '@/types/cart';

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
export const selectCartTax = (state: RootState) => selectCartSubtotal(state) * 0.1;
export const selectCartShipping = (state: RootState) => (selectCartSubtotal(state) > 100 ? 0 : 10);
export const selectCartDiscount = (state: RootState) => 0;
export const selectCartGrandTotal = (state: RootState) =>
  selectCartSubtotal(state) + selectCartTax(state) + selectCartShipping(state) - selectCartDiscount(state);

export default cartSlice.reducer; 