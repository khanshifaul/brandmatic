"use client";

import { Button } from "@/components/atoms/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className='relative h-[80vh] bg-gradient-to-r from-primary/90 to-primary flex items-center'>
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-grid' />
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <motion.h1
            className='text-4xl md:text-6xl font-bold text-foreground'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Modern E-commerce Experience
          </motion.h1>
          <motion.p
            className='text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our curated collection of products with dynamic theming capabilities and a beautiful, modern
            interface.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Link href='/products'>
              <Button title='Browse Products' variant='default' className='w-full sm:w-auto'>
                Browse Products
              </Button>
            </Link>
            <Link href='/theme-settings'>
              <Button title='Customize Theme' variant='outline' className='w-full sm:w-auto'>
                Customize Theme
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
