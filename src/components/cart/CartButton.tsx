import { openCart, selectCartItemCount } from "@/lib/features/cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const CartButton: React.FC = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemCount);

  return (
    <button
      onClick={() => dispatch(openCart())}
      className='relative rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
    >
      <span className='sr-only'>Cart</span>
      <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
      {itemCount > 0 && (
        <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white'>
          {itemCount}
        </span>
      )}
    </button>
  );
};
