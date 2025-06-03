'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white">
        <div className="text-center space-y-4 p-8">
          <h1 className="text-5xl font-bold">ChromaFlow Shop</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our curated collection of products with a dynamically themed shopping experience
          </p>
          <div className="mt-8">
            <Link 
              href="/products" 
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Dynamic Theming</h3>
            <p className="text-foreground-muted">
              Experience our color-adaptive interface that matches your brand
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Curated Products</h3>
            <p className="text-foreground-muted">
              Shop from our carefully selected collection of premium items
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Fast Checkout</h3>
            <p className="text-foreground-muted">
              Seamless and secure shopping experience from cart to delivery
            </p>
          </div>
        </div>
      </section>

      {/* Theme Settings CTA */}
      <section className="py-16 px-8 bg-background-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Customize Your Experience</h2>
          <p className="text-lg mb-8 text-foreground-muted">
            Want to see the store in your brand colors? Try our theme customization tool.
          </p>
          <Link 
            href="/theme-settings" 
            className="inline-block bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Customize Theme
          </Link>
        </div>
      </section>
    </main>
  );
} 