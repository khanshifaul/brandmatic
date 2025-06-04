"use client";

import { useCart } from "@/hooks/useCart";
import { useBusiness } from "@/hooks/useBusiness";
import { formatCurrency } from "@/utils/formatCurrency";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { Button } from "../atoms/button";
import { CartItem } from "../molecules/cartItem";
import { Sheet, SheetContent, SheetFooter } from "../molecules/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem as CartItemType } from "@/types/cart";

interface UnifiedCartProps {
  mode: 'sheet' | 'drawer';
  isOpen: boolean;
  onClose: () => void;
}

export function UnifiedCart({ mode, isOpen, onClose }: UnifiedCartProps) {
  const router = useRouter();
  const { businessData } = useBusiness();
  const { 
    items, 
    itemCount, 
    subtotal,
    tax,
    shipping,
    total,
    removeItem,
    updateQuantity
  } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsClient(true);
  }, []);

  const currency = businessData?.currency?.[0] || "USD";

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    router.push('/checkout');
    onClose();
  };

  const CartContent = () => {
    if (!isClient) return null;
    
    return (
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 p-8">
            <div className="rounded-full bg-muted/80 p-6">
              <FiShoppingCart className="w-10 h-10 text-muted-foreground/70" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground max-w-[240px] mx-auto">
                Add items to your cart to continue shopping
              </p>
            </div>
            <Button 
              variant="default" 
              size="lg"
              className="min-w-[160px] font-medium"
              onClick={() => {
                router.push('/products');
                onClose();
              }}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <span className="text-sm text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>
            <div className="pb-32">
              {items.map((item: CartItemType) => (
                <CartItem 
                  key={item.productId}
                  item={item} 
                  onRemove={() => removeItem(item.productId)}
                  onQuantityChange={(quantity) => updateQuantity(item.productId, quantity)}
                  showQuantityControls={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const CartFooter = () => {
    if (!isClient || items.length === 0) return null;
    
    return (
      <div className="space-y-4 px-6 py-4 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums font-medium">{formatCurrency(subtotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="tabular-nums font-medium">{formatCurrency(tax, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="tabular-nums font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping, currency)}</span>
          </div>
          <hr className="my-3 border-border" />
          <div className="flex items-center justify-between text-base">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold tabular-nums">{formatCurrency(total, currency)}</span>
          </div>
        </div>

        <div className="grid gap-2.5">
          <Button 
            size="lg" 
            className="w-full font-medium"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="w-full"
            onClick={() => {
              router.push('/products');
              onClose();
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  };

  if (!isMounted) {
    return null;
  }

  if (mode === 'sheet') {
    return (
      <Sheet 
        isOpen={isOpen} 
        onClose={onClose} 
        position="right"
        size="md"
        showHeader={false}
      >
        <SheetContent className="flex flex-col w-full p-0">
          <CartContent />
        </SheetContent>
        <SheetFooter>
          <CartFooter />
        </SheetFooter>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="flex items-center justify-between">
            Shopping Cart ({itemCount})
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              onClick={onClose}
            >
              <FiX className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogTitle>
        </DialogHeader>
        <CartContent />
        <CartFooter />
      </DialogContent>
    </Dialog>
  );
} 