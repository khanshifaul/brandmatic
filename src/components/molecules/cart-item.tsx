"use client";

import { Button } from "@/components/atoms/button";
import { useBusiness } from "@/hooks/useBusiness";
import { CartItem as TCartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

interface CartItemProps {
  item: TCartItem;
  onRemove: () => void;
  onQuantityChange?: (quantity: number) => void;
  showQuantityControls?: boolean;
}

export function CartItem({ item, onRemove, onQuantityChange, showQuantityControls = false }: CartItemProps) {
  const { businessData } = useBusiness();
  const currency = businessData?.currency?.[0] || "TK";

  // Safely handle missing image data
  const imageData = item?.image?.image;
  const imageUrl = imageData ? imageData.optimizeUrl || imageData.secure_url || "/no-image.svg" : "/no-image.svg";

  const handleQuantityChange = (delta: number) => {
    if (!onQuantityChange) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 1 && newQuantity <= item.maxStock) {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className='flex gap-4 p-4'>
      {" "}
      <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md'>
        {imageUrl && (
          <Image
            src={imageUrl as string}
            alt={item?.name || "Product image"}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 96px, 96px'
            onError={(e) => {
              // Fallback to no-image if the image fails to load
              const imgElement = e.currentTarget as HTMLImageElement;
              imgElement.src = "/no-image.svg";
            }}
          />
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between text-base font-medium'>
          <h3 className='text-foreground'>{item.name}</h3>
          <p className='ml-4 text-foreground'>{formatCurrency(item.price * item.quantity, currency)}</p>
        </div>

        <div className='flex flex-1 items-end justify-between text-sm'>
          <div className='flex items-center gap-4'>
            {showQuantityControls ? (
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 w-8 p-0'
                  onClick={() => handleQuantityChange(-1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span className='w-8 text-center'>{item.quantity}</span>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 w-8 p-0'
                  onClick={() => handleQuantityChange(1)}
                  disabled={item.quantity >= item.maxStock}
                >
                  +
                </Button>
              </div>
            ) : (
              <p className='text-muted-foreground'>Qty {item.quantity}</p>
            )}
          </div>
          <Button variant='ghost' size='sm' className='text-sm font-medium text-primary' onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
