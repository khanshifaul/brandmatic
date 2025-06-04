import { Product, Variant } from "./product";
import { ProductImage } from './product';

export interface TCartItem {
  productId: string;
  name: string;
  price: number;
  image: {
    _id: string;
    image: ProductImage;
  };
  quantity: number;
  maxStock: number;
  variant?: {
    _id: string;
    name: string;
    selling_price: string;
    variants_stock: number;
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: {
    _id: string;
    image: ProductImage;
  };
  quantity: number;
  maxStock: number;
  variant?: {
    _id: string;
    name: string;
    selling_price: string;
    variants_stock: number;
  };
} 