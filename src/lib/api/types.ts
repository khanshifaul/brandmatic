import { Business, BusinessResponse } from "@/types/business";
import { Product, ProductResponse } from "@/types/product";
import { TCartItem } from "@/types/cart";

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export type { Business, BusinessResponse, Product, ProductResponse, TCartItem };

// Remove duplicate type definitions
// export interface Business {
//   _id: string;
//   name: string;
//   description?: string;
//   logo?: string;
//   currency: string[];
//   categories: Category[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category?: string;
//   inStock: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Category {
//   _id: string;
//   name: string;
//   description?: string;
//   image?: string;
// } 