import { useCreateOnlineOrderMutation } from "@/lib/api/publicApi";
import {
  clearCart,
  closeCart,
  removeItem,
  selectCartGrandTotal,
  selectCartItems,
  selectCartShipping,
  selectCartSubtotal,
  selectIsCartOpen,
  updateQuantity,
} from "@/lib/features/cart/cartSlice";
import { CartItem } from "@/types/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartGrandTotal);
  const isOpen = useSelector(selectIsCartOpen);
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [note, setNote] = useState("");

  const [createOrder, { isLoading }] = useCreateOnlineOrderMutation();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };
  const handleDeliveryAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryArea(e.target.value as "inside_dhaka" | "outside_dhaka");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      router.push("/checkout");
    } catch (error) {
      console.error("Error navigating to checkout:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
      <div className='absolute inset-0 bg-black bg-opacity-50' onClick={() => dispatch(closeCart())} />

      <div className='absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl'>
        <div className='flex h-full flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between border-b px-4 py-3'>
            <h2 className='text-lg font-semibold'>Shopping Cart</h2>
            <button onClick={() => dispatch(closeCart())} className='text-gray-400 hover:text-gray-500'>
              <span className='sr-only'>Close</span>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className='flex-1 overflow-y-auto p-4'>
            {items.length === 0 ? (
              <p className='text-center text-gray-500'>Your cart is empty</p>
            ) : (
              <ul className='divide-y divide-gray-200'>
                {items.map((item: CartItem) => (
                  <li key={item.productId} className='flex py-4'>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
                      <Image
                        src={item.image.image.secure_url}
                        alt={item.name}
                        width={96}
                        height={96}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='ml-4 flex flex-1 flex-col'>
                      <div className='flex justify-between'>
                        <h3 className='text-sm font-medium'>{item.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className='text-sm font-medium text-red-600 hover:text-red-500'
                        >
                          Remove
                        </button>
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>${item.price.toFixed(2)}</p>
                      <div className='mt-2 flex items-center'>
                        <label htmlFor={`quantity-${item.productId}`} className='sr-only'>
                          Quantity
                        </label>
                        <select
                          id={`quantity-${item.productId}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                          className='rounded-md border border-gray-300 text-base'
                        >
                          {[...Array(item.maxStock)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className='border-t border-gray-200 p-4'>
              <div className='space-y-4'>
                {/* Delivery Area */}
                <div>
                  <label htmlFor='delivery-area' className='block text-sm font-medium text-gray-700'>
                    Delivery Area
                  </label>
                  <select
                    id='delivery-area'
                    value={deliveryArea}
                    onChange={handleDeliveryAreaChange}
                    className='mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                  >
                    <option value='inside_dhaka'>Inside Dhaka</option>
                    <option value='outside_dhaka'>Outside Dhaka</option>
                  </select>
                </div>

                {/* Note */}
                <div>
                  <label htmlFor='note' className='block text-sm font-medium text-gray-700'>
                    Order Note (Optional)
                  </label>
                  <textarea
                    id='note'
                    value={note}
                    onChange={handleNoteChange}
                    rows={3}
                    className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                    placeholder='Add any special instructions...'
                  />
                </div>

                {/* Summary */}
                <dl className='space-y-2'>
                  <div className='flex justify-between'>
                    <dt className='text-sm text-gray-600'>Subtotal</dt>
                    <dd className='text-sm font-medium'>${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className='flex justify-between'>
                    <dt className='text-sm text-gray-600'>Shipping</dt>
                    <dd className='text-sm font-medium'>${shipping.toFixed(2)}</dd>
                  </div>
                  <div className='flex justify-between border-t border-gray-200 pt-2'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium'>${total.toFixed(2)}</dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className='mt-6 space-y-2'>
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className='w-full rounded-md bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400'
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </button>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className='w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
