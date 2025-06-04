import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse, Business, Product } from "./types";
import { Category } from "@/types/category";

// Constants
const PUBLIC_API_URL = "/api";
const OWNER_ID = process.env.NEXT_PUBLIC_OWNER_ID || "6829ddabc20c6404b3e2a66b";
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "682b5d636be45193cf943b85";

// Type Guard for HYDRATE
function isHydrateAction(action: Action): action is PayloadAction<Record<string, unknown>> {
  return action.type === HYDRATE;
}

// Define the API endpoints
type Endpoints = {
  getBusiness: { response: Business; args: void };
  getProducts: { response: Product[]; args: Partial<{ search?: string; page?: number; limit?: number; category?: string }> };
  getProduct: { response: Product; args: string };
  getCategories: { response: Category[]; args: void };
};

// API Definition
export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: PUBLIC_API_URL }),
  tagTypes: ["Product", "Products", "Category", "Business"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath] as any;
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getBusiness: builder.query<Endpoints["getBusiness"]["response"], Endpoints["getBusiness"]["args"]>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) => res.data[0],
      providesTags: ["Business"],
    }),

    getProducts: builder.query<Endpoints["getProducts"]["response"], Endpoints["getProducts"]["args"]>({
      query: (params = {}) => ({
        url: "/products",
        params,
      }),
      transformResponse: (res: ApiResponse<Product[]>) => res.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Product" as const, id: _id })), { type: "Products", id: "LIST" }]
          : [{ type: "Products", id: "LIST" }],
    }),

    getProduct: builder.query<Endpoints["getProduct"]["response"], Endpoints["getProduct"]["args"]>({
      query: (productId) => `/products/${productId}`,
      transformResponse: (res: ApiResponse<Product>) => res.data,
      providesTags: (result) => (result ? [{ type: "Product", id: result._id }] : []),
    }),

    getCategories: builder.query<Endpoints["getCategories"]["response"], Endpoints["getCategories"]["args"]>({
      query: () => "/categories",
      transformResponse: (res: ApiResponse<Category[]>) => res.data,
      providesTags: (result) =>
        result ? result.map((category) => ({ type: "Category" as const, id: category._id })) : [],
    }),
  }),
});

// Export hooks
export const {
  useGetBusinessQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
} = publicApi; 