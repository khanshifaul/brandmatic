// src/components/AddToCartBtn.tsx (Client Component)
"use client";

import { useCart } from "@/hooks/useCart";
import { TCartItem } from "@/lib/features/cart/cartSlice";
import type { Product, Variant } from "@/types/product";
import { Button } from "../atoms/button";

interface AddToCartBtnProps {
  item: Product;
  variant?: Variant;
  quantity?: number;
}

export default function AddToCartBtn({ item, variant, quantity = 1 }: AddToCartBtnProps) {
  const cart = useCart();

  const handleAdd = () => {
    const selected = variant || item.variantsId[0];
    const cartItem: TCartItem = {
      _id: selected._id,
      name: variant ? `${item.name} - ${variant.name.split("/").pop()?.trim()}` : item.name,
      price: Number(selected.selling_price),
      image: variant?.image.image.secure_url || item.images[0]?.image.secure_url,
      quantity,
      maxStock: selected.variants_stock || item.total_stock,
    };
    cart.addItem(cartItem);
  };

  const disabled = !item.isPublish || (variant ? variant.variants_stock <= 0 : item.total_stock <= 0);

  return (
    <Button title='Add to Cart' onClick={handleAdd} disabled={disabled} size='md'>
      Add to Cart
    </Button>
  );
}
