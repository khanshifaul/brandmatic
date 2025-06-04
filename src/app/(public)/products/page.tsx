"use client";

import { useState } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/lib/api/publicApi';
import { ProductCard } from '@/components/molecules/product-card';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Skeleton } from '@/components/atoms/skeleton';
import { Product } from '@/types/product';
import type { ChangeEvent } from 'react';

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { value: "newest-desc", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
] as const;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<typeof sortOptions[number]['value']>(sortOptions[0].value);

  // Fetch products with pagination and filters
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useGetProductsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    category: selectedCategory,
    search: searchQuery || undefined,
  });

  // Fetch categories for filter
  const { data: categories } = useGetCategoriesQuery();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Loading skeletons
  const ProductSkeleton = () => (
    <div className="bg-background-subtle rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-background-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-background-muted rounded w-3/4" />
        <div className="h-4 bg-background-muted rounded w-1/2" />
        <div className="h-4 bg-background-muted rounded w-1/4" />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-foreground-muted max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div className="bg-background-subtle p-4 rounded-lg border border-border">
              <h2 className="font-semibold text-foreground mb-4">Sort By</h2>
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value as typeof sortOptions[number]['value'])}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div className="bg-background-subtle p-4 rounded-lg border border-border">
              <h2 className="font-semibold text-foreground mb-4">Categories</h2>
              <div className="space-y-2">
                <Button
                  onClick={() => setSelectedCategory(undefined)}
                  variant={!selectedCategory ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  All Products
                </Button>
                {categories?.map((category) => (
                  <Button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    variant={selectedCategory === category._id ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="space-y-6">
            {productsError ? (
              <div className="text-center py-12 text-foreground-muted">
                Failed to load products. Please try again later.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoadingProducts
                    ? Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
                        <ProductSkeleton key={index} />
                      ))
                    : productsData?.map((product: Product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>

                {/* Pagination */}
                {productsData && productsData.length > 0 && (
                  <div className="flex justify-center items-center gap-2 pt-8">
                    <Button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <span className="text-foreground-muted">
                      Page {currentPage}
                    </span>
                    <Button
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={productsData.length < ITEMS_PER_PAGE}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
