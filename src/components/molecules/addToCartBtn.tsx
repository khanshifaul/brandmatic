// src/components/AddToCartBtn.tsx (Client Component)
"use client";

import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/cart";
import type { Product, Variant } from "@/types/product";
import { Button } from "../atoms/button";

interface AddToCartBtnProps {
  product: Product;
  variant?: Variant;
  quantity?: number;
  className?: string;
}

export function AddToCartBtn({
  product,
  variant,
  quantity = 1,
  className,
}: AddToCartBtnProps) {
  const { addItem, items } = useCart();
  const itemId = variant?._id || product._id;
  const isInCart = items.some((item: CartItem) => item.productId === itemId);

  const handleAddToCart = () => {
    const item: CartItem = {
      productId: itemId,
      quantity,
      name: variant?.name || product.name,
      price: Number(variant?.selling_price || product.variantsId[0]?.selling_price || 0),
      image: {
        _id: variant?.image?._id || product.images[0]?._id,
        image: variant?.image?.image || product.images[0]?.image,
      },
      maxStock: variant?.variants_stock || product.total_stock,
      variant: variant ? {
        _id: variant._id,
        name: variant.name,
        selling_price: variant.selling_price,
        variants_stock: variant.variants_stock,
      } : undefined,
    };
    addItem(item);
  };

  const isOutOfStock = variant
    ? variant.variants_stock === 0
    : product.total_stock === 0;

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isOutOfStock || isInCart}
      className={className}
      title={isOutOfStock ? "Out of stock" : isInCart ? "Already in cart" : "Add to cart"}
    >
      {isOutOfStock ? "Out of Stock" : isInCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
}
