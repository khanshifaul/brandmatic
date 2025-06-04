"use client";

import { Pagination } from "@/components/molecules/Pagination";
import { ProductFilters } from "@/components/molecules/ProductFilters";
import { ProductSort } from "@/components/molecules/ProductSort";
import { useGetProductsQuery } from "@/lib/api/publicApi";
import {
  resetFilters,
  selectFilters,
  selectPagination,
  selectProducts,
  setCategory,
  setInStock,
  setPage,
  setSortBy,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  quantity: number;
}

type SortBy = "newest" | "price" | "rating";
type SortOrder = "asc" | "desc";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const { page, limit, total } = useAppSelector(selectPagination);
  const products = useAppSelector(selectProducts);

  const { data, isLoading, error } = useGetProductsQuery({
    page,
    limit,
    category: filters.category || undefined,
  });

  useEffect(() => {
    if (data) {
      // Update products in store
    }
  }, [data, dispatch]);

  const sortOptions = [
    { value: "newest-desc", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
  ];

  const filterGroups = [
    {
      id: "category",
      label: "Category",
      options: [
        { id: "electronics", value: "electronics", label: "Electronics" },
        { id: "clothing", value: "clothing", label: "Clothing" },
        { id: "books", value: "books", label: "Books" },
      ],
    },
    {
      id: "availability",
      label: "Availability",
      options: [
        { id: "in-stock", value: "true", label: "In Stock" },
        { id: "out-of-stock", value: "false", label: "Out of Stock" },
      ],
    },
  ];

  const handleFilterChange = (groupId: string, value: string) => {
    switch (groupId) {
      case "category":
        dispatch(setCategory(value || null));
        break;
      case "availability":
        dispatch(setInStock(value ? value === "true" : null));
        break;
    }
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-") as [SortBy, SortOrder];
    dispatch(setSortBy({ sortBy, sortOrder }));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Filters */}
        <div className='w-full md:w-64'>
          <ProductFilters
            filters={filterGroups}
            selectedFilters={{
              category: filters.category ? [filters.category] : [],
              availability: filters.inStock !== null ? [String(filters.inStock)] : [],
            }}
            onFilterChange={handleFilterChange}
            onClearFilters={() => dispatch(resetFilters())}
          />
        </div>

        {/* Products */}
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>Products</h1>
            <ProductSort
              options={sortOptions}
              currentSort={`${filters.sortBy}-${filters.sortOrder}`}
              onSortChange={handleSortChange}
            />
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-error'>Error loading products</div>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product: Product) => (
                  <div key={product._id} className='border border-border rounded-lg p-4'>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => dispatch(setPage(newPage))}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
