// hooks/useCart.ts
'use client';

import { useState, useEffect } from 'react';

export default function useCart() {
  const [carrito, setCarrito] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCarrito(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (item: {
    productId: string;
    varianteId?: string;
    cantidad: number;
    precio: number;
    nombre: string;
    imagen: string;
  }) => {
    setCarrito(prev => {
      const existingItem = prev.find(i => 
        i.productId === item.productId && 
        i.varianteId === item.varianteId
      );

      if (existingItem) {
        return prev.map(i =>
          i.productId === item.productId && i.varianteId === item.varianteId
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        );
      }

      return [...prev, item];
    });
  };

  return { carrito, addToCart };
}