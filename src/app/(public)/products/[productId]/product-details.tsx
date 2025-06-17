"use client";

import { Button } from "@/components/atoms/button";
import { useBusiness } from "@/hooks/useBusiness";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { businessData } = useBusiness();
  const { addItem } = useCart();
  const currency = businessData?.currency?.[0] || "USD";

  const mainImage = product.images[0]?.image.secure_url || "/fallback-image.jpg";
  const variant = product.variantsId[0];
  const price = variant?.selling_price || product.price.toString();
  const inStock = product.total_stock > 0;

  const handleAddToCart = () => {
    if (!variant) return;

    addItem({
      productId: product._id,
      name: product.name,
      price: parseFloat(variant.selling_price),
      image: product.images[0] || {
        _id: "",
        image: {
          public_id: "fallback",
          secure_url: "/fallback-image.jpg",
          optimizeUrl: "/fallback-image.jpg",
        },
      },
      quantity: 1,
      maxStock: variant.variants_stock,
    });
  };

  return (
    <article className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-6xl mx-auto'>
      <div className='relative aspect-square bg-muted rounded-lg overflow-hidden'>
        <Image
          src={mainImage}
          alt={product.name}
          className='object-cover'
          fill
          priority
          sizes='(min-width: 640px) 16rem, 100vw'
        />
      </div>

      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>{product.name}</h1>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold text-primary'>{formatCurrency(parseFloat(price), currency)}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              inStock ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {product.short_description && (
          <div className='prose max-w-none text-muted-foreground'>
            <p>{product.short_description}</p>
          </div>
        )}

        <Button onClick={handleAddToCart} disabled={!inStock} className='w-full md:w-auto'>
          Add to Cart
        </Button>

        {product.long_description && (
          <section className='pt-4 border-t border-border'>
            <h2 className='text-xl font-semibold mb-3'>Product Details</h2>
            <div className='prose max-w-none text-muted-foreground'>
              <p>{product.long_description}</p>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
