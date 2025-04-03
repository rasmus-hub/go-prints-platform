'use client';

import { useCartContext } from '@/context/CartContext';
import { useCart } from '@/hooks/useCart';

export function CartButton() {
  const { openCart } = useCartContext();
  const { count } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Abrir carrito (${count} items)`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}