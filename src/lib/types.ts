import { ThemeState } from './features/theme/themeSlice';
import { CartState } from './features/cart/cartSlice';

export interface RootState {
  cart: CartState;
  theme: ThemeState;
} 