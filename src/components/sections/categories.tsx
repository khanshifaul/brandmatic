"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    icon: "🔌",
    href: "/products?category=electronics",
  },
  {
    name: "Fashion",
    description: "Trendy clothing and accessories",
    icon: "👕",
    href: "/products?category=fashion",
  },
  {
    name: "Home & Living",
    description: "Furniture and home decor",
    icon: "🏠",
    href: "/products?category=home-living",
  },
  {
    name: "Books",
    description: "Books and stationery",
    icon: "📚",
    href: "/products?category=books",
  },
];

export function Categories() {
  return (
    <section className='py-16'>
      <div className='text-center mb-12'>
        <motion.h2
          className='text-3xl font-bold mb-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop by Category
        </motion.h2>
        <motion.p
          className='text-muted-foreground'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Browse our wide selection of products by category
        </motion.p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={category.href}
              className='block p-6 bg-background hover:bg-background-subtle rounded-lg transition-colors border border-border'
            >
              <span className='text-4xl mb-4 block'>{category.icon}</span>
              <h3 className='font-medium text-lg mb-2'>{category.name}</h3>
              <p className='text-sm text-foreground-muted'>{category.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
