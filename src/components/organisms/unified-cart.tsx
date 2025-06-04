"use client";

import { useCart } from "@/hooks/useCart";
import { useBusiness } from "@/hooks/useBusiness";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../atoms/button";
import { CartItem } from "../molecules/cartItem";
import { Sheet, SheetContent, SheetFooter } from "../molecules/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    router.push('/checkout');
    onClose();
  };

  const CartContent = () => {
    if (!isClient) return null;
    
    return (
      <div className='flex-1 overflow-y-auto'>
        {items.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full gap-4 p-8'>
            <FiShoppingCart className='w-12 h-12 text-gray-400' />
            <p className='text-lg font-medium'>Your cart is empty</p>
            <Button title='Continue Shopping'>
              <Link href='/products' onClick={onClose}>
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className='divide-y dark:divide-gray-700'>
            {items.map((item: any) => (
              <CartItem 
                key={item._id} 
                item={item} 
                onRemove={() => removeItem(item._id)}
                onQuantityChange={(quantity) => updateQuantity(item._id, quantity)}
                showQuantityControls={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const CartFooter = () => {
    if (!isClient) return null;
    
    return items.length > 0 ? (
      <div className='space-y-2 p-4 border-t'>
        <div className='flex justify-between text-lg font-semibold pt-2'>
          <span>Total</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>

        <Button title='Continue Shopping' size='default' variant='outline' className='w-full' onClick={onClose}>
          Continue Shopping
        </Button>
        <Button title='Checkout' className='w-full' size='lg' onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    ) : null;
  };

  if (!isMounted) {
    return null;
  }

  if (mode === 'sheet') {
    return (
      <Sheet isOpen={isOpen} onClose={onClose} position='right' title={`Your Cart (${itemCount})`}>
        <SheetContent className='p-0 flex flex-col'>
          <CartContent />
          <SheetFooter>
            <CartFooter />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Shopping Cart ({itemCount})</DialogTitle>
        </DialogHeader>
        <CartContent />
        <CartFooter />
      </DialogContent>
    </Dialog>
  );
} 