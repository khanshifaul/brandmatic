import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { HYDRATE } from "next-redux-wrapper";
import { ApiResponse } from "@/types/apiResponse";
import { Business } from "@/types/business";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { OnlineOrderPayload, OnlineOrderResponse } from "@/types/onlineOrder";

// Constants
const PUBLIC_API_URL = "/api";
const OWNER_ID = process.env.NEXT_PUBLIC_OWNER_ID || "6829ddabc20c6404b3e2a66b";
const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "682b5d636be45193cf943b85";

// Type Guard for HYDRATE
function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}

// API Types
interface GetProductsParams {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  _id?: string;
}

// API Definition
export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: PUBLIC_API_URL }),
  tagTypes: ["Product", "Products", "Category", "Business"] as const,
  extractRehydrationInfo(action: Action, { reducerPath }: { reducerPath: string }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getBusiness: builder.query<Business, void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}`,
      transformResponse: (res: ApiResponse<Business[]>) => res.data[0],
      providesTags: ["Business"],
    }),

    getProducts: builder.query<Product[], GetProductsParams | undefined>({
      query: (params) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/products`,
        params: params || undefined,
      }),
      transformResponse: (res: ApiResponse<Product[]>) => res.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Product" as const, id: _id })), "Products"]
          : ["Products"],
    }),

    getProduct: builder.query<Product, string>({
      query: (productId) => `/public/${OWNER_ID}/${BUSINESS_ID}/products/${productId}`,
      transformResponse: (res: ApiResponse<Product>) => res.data,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => `/public/${OWNER_ID}/${BUSINESS_ID}/categories`,
      transformResponse: (res: ApiResponse<Category[]>) => res.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Category" as const, id: _id }))]
          : ["Category"],
    }),

    createOnlineOrder: builder.mutation<OnlineOrderResponse, OnlineOrderPayload>({
      query: (orderData) => ({
        url: `/public/${OWNER_ID}/${BUSINESS_ID}/online-order`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks
export const {
  useGetBusinessQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateOnlineOrderMutation,
} = publicApi; 