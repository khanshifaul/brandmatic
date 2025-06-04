'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/lib/api/publicApi';

export default function HomePage() {
  // Fetch featured products
  const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery({ featured: true, limit: 4 });
  
  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Improved with better mobile spacing and gradient */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-background/10 backdrop-blur-sm text-background rounded-full text-sm font-medium mb-4">
            🌟 New Season Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background tracking-tight">
            ChromaFlow Shop
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-background/90 font-medium">
            Discover our curated collection of products with a dynamically themed shopping experience
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in">
            <Link 
              href="/products" 
              className="inline-flex items-center bg-background text-primary px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Shop Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/categories" 
              className="inline-flex items-center bg-background/10 text-background px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-background/20 transition-all duration-300 backdrop-blur-sm"
            >
              Browse Categories
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>

      {/* Categories Section - Now using real data */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-foreground-muted">Explore our wide range of products by category</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {isLoadingCategories ? (
              // Loading skeleton for categories
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="aspect-square rounded-2xl bg-background-subtle animate-pulse" />
              ))
            ) : categories?.map((category) => (
              <Link 
                key={category._id}
                href={`/categories/${category._id}`}
                className="group relative overflow-hidden rounded-2xl aspect-square bg-background-subtle hover:bg-background transition-all duration-300"
              >
                {category.imageUrl && (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <span className="text-sm text-white/80 group-hover:translate-x-2 transition-transform duration-300">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with better cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background-subtle">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="group p-6 sm:p-8 bg-background hover:bg-background rounded-2xl transition-all duration-300 border border-border hover:border-primary/20 hover:shadow-lg">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎨</div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Dynamic Theming</h3>
            <p className="text-foreground-muted group-hover:text-foreground transition-colors">
              Experience our color-adaptive interface that matches your brand
            </p>
          </div>
          <div className="group p-6 sm:p-8 bg-background hover:bg-background rounded-2xl transition-all duration-300 border border-border hover:border-secondary/20 hover:shadow-lg">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🛍️</div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Curated Products</h3>
            <p className="text-foreground-muted group-hover:text-foreground transition-colors">
              Shop from our carefully selected collection of premium items
            </p>
          </div>
          <div className="group p-6 sm:p-8 bg-background hover:bg-background rounded-2xl transition-all duration-300 border border-border hover:border-accent/20 hover:shadow-lg">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Fast Checkout</h3>
            <p className="text-foreground-muted group-hover:text-foreground transition-colors">
              Seamless and secure shopping experience from cart to delivery
            </p>
          </div>
        </div>
      </section>

      {/* Trending Products Section - Now using real data */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Trending Now</h2>
              <p className="text-foreground-muted">Our most popular products this week</p>
            </div>
            <Link 
              href="/products"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {isLoadingProducts ? (
              // Loading skeleton for products
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="rounded-2xl bg-background-subtle animate-pulse">
                  <div className="aspect-[4/5]"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-background-muted rounded w-3/4"></div>
                    <div className="h-4 bg-background-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : products?.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group relative bg-background-subtle rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/5] relative bg-background-muted">
                  {product.images?.[0]?.image?.secure_url && (
                    <Image
                      src={product.images[0].image.secure_url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-foreground-muted mt-1">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-success">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-foreground-muted">Trusted by thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                text: "Amazing shopping experience! The theme customization feature is unique and the products are high quality.",
                author: "Sarah Johnson",
                role: "Verified Buyer"
              },
              {
                text: "Fast delivery and excellent customer service. The website's design makes shopping a breeze.",
                author: "Michael Chen",
                role: "Verified Buyer"
              },
              {
                text: "Love how the website adapts to my brand colors. It's like having a personalized shopping experience.",
                author: "Emma Davis",
                role: "Verified Buyer"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-foreground mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-background-muted flex items-center justify-center text-foreground-muted">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-foreground-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Stay Updated</h2>
          <p className="text-lg mb-8 text-foreground-muted max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Theme Settings CTA - Enhanced with better gradient and hover effects */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background-subtle to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Customize Your Experience
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-foreground-muted max-w-2xl mx-auto">
            Want to see the store in your brand colors? Try our theme customization tool.
          </p>
          <Link 
            href="/theme-settings" 
            className="inline-flex items-center px-6 py-3 text-background font-semibold bg-accent hover:bg-accent/90 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>Customize Theme</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
} 