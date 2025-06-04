// api/baseApi.ts
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type ErrorResponse = {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  status?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error as ErrorResponse;
    const showError = (defaultMessage: string) => {
      const message =
        data?.message || (data?.errors ? Object.values(data.errors).flat().join(" ") : null) || defaultMessage;
      console.error("API Error:", message);
      // Here you could dispatch a notification action or use a toast system
    };

    switch (status) {
      case 401: {
        // Handle unauthorized - could dispatch logout or try token refresh
        showError("Session expired. Please log in again.");
        break;
      }

      case 403:
        showError("You don't have permission to perform this action.");
        break;

      case 404:
        showError("The requested resource was not found.");
        break;

      case 500:
        showError("Server error. Please try again later.");
        break;

      case 400:
        showError("Invalid request. Please check your input.");
        break;

      default:
        showError("An unexpected error occurred.");
        break;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Auth", "User", "Products", "Cart"],
  endpoints: () => ({}),
}); 