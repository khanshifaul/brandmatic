import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  quantity: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    inStock: boolean | null;
    sortBy: 'price' | 'rating' | 'newest' | null;
    sortOrder: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  search: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    inStock: null,
    sortBy: null,
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  search: '',
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
      state.pagination.page = 1; // Reset to first page
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
      state.pagination.page = 1;
    },
    setInStock: (state, action: PayloadAction<boolean | null>) => {
      state.filters.inStock = action.payload;
      state.pagination.page = 1;
    },
    setSortBy: (state, action: PayloadAction<{ sortBy: 'price' | 'rating' | 'newest' | null; sortOrder: 'asc' | 'desc' }>) => {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.pagination.total = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.pagination.page = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
      state.search = '';
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setCategory,
  setPriceRange,
  setInStock,
  setSortBy,
  setPage,
  setLimit,
  setTotal,
  setSearch,
  setLoading,
  setError,
  resetFilters,
} = productsSlice.actions;

// Selectors
export const selectProducts = (state: RootState) => state.products.items;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectPagination = (state: RootState) => state.products.pagination;
export const selectSearch = (state: RootState) => state.products.search;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
export const selectError = (state: RootState) => state.products.error;

// Computed selectors
export const selectFilteredProducts = (state: RootState) => {
  const { items, filters, search } = state.products;
  
  return items.filter((product: Product) => {
    // Search filter
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Stock filter
    if (filters.inStock !== null && product.inStock !== filters.inStock) {
      return false;
    }
    
    return true;
  });
};

export const selectSortedProducts = (state: RootState) => {
  const filtered = selectFilteredProducts(state);
  const { sortBy, sortOrder } = state.products.filters;
  
  if (!sortBy) return filtered;
  
  return [...filtered].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'newest':
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const selectPaginatedProducts = (state: RootState) => {
  const sorted = selectSortedProducts(state);
  const { page, limit } = state.products.pagination;
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return sorted.slice(start, end);
};

export default productsSlice.reducer; 