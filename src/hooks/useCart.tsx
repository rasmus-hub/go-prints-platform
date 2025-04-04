'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type CartItem = {
  productId: string;
  varianteId?: string;
  cantidad: number;
  precio: number;
  nombre: string;
  imagen: string;
};

const fetchCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function useCart() {
  const queryClient = useQueryClient();

  const { data: carrito = [] } = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    initialData: []
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: (newItem: CartItem) => {
      const existingItem = carrito.find(item => 
        item.productId === newItem.productId && 
        item.varianteId === newItem.varianteId
      );

      const updatedCart = existingItem
        ? carrito.map(item =>
            item.productId === newItem.productId && item.varianteId === newItem.varianteId
              ? { ...item, cantidad: item.cantidad + newItem.cantidad }
              : item
          )
        : [...carrito, newItem];

      saveCart(updatedCart);
      return Promise.resolve(updatedCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    }
  });

  const { mutate: removeFromCart } = useMutation({
    mutationFn: ({ productId, varianteId }: { productId: string; varianteId?: string }) => {
      const updatedCart = carrito.filter(item => 
        !(item.productId === productId && item.varianteId === varianteId)
      );
      saveCart(updatedCart);
      return Promise.resolve(updatedCart);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    }
  });

  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;
  const count = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const { mutate: clearCart } = useMutation({
    mutationFn: () => {
      const emptyCart: CartItem[] = []
      saveCart(emptyCart)
      return Promise.resolve(emptyCart)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data)
    }
  })

  return {
    carrito,
    addToCart,
    removeFromCart,
    clearCart,
    subtotal,
    impuestos,
    total,
    count
  }
}