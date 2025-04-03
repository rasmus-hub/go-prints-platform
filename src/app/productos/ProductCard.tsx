import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useCart } from '@/hooks/useCart';
import { getProductById, type Product } from '@/services/products';

export default function ProductCard({ product }: { product: Product }) {
  const queryClient = useQueryClient();

  const { addToCart } = useCart();

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => getProductById(String(product.id)),
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
        productId: product.id,
        cantidad: 1,
        precio: product.precio,
        nombre: product.nombre,
        imagen: product.imagen_url,
    };

    console.log('Añadiendo al carrito:', cartItem);
    addToCart(cartItem);
    alert(`${product.nombre} añadido al carrito`);
  };

  return (
    <div 
      className="card bg-dark-200 rounded-lg overflow-hidden shadow-md hover:shadow-glow transition-all duration-300 h-full flex flex-col border border-dark-300"
      style={{
        '--tw-shadow-glow': '0 0 15px rgba(0, 166, 153, 0.3)',
        '--tw-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      } as React.CSSProperties}
    >
      <div className="p-4 flex-grow flex flex-col">
        <Link
          href={`/productos/${product.id}`}
          onMouseEnter={prefetchProduct}
          className="group"
        >
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-light-100 group-hover:text-primary transition-colors duration-200">
            {product.nombre}
          </h3>
        </Link>
        
        <div className="relative w-full mb-3 rounded-md overflow-hidden">
          <Image 
            src={product.imagen_url}
            alt={product.nombre}
            width={300}
            height={300}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        <p className="text-light-200 text-sm mb-2 line-clamp-3 flex-grow">
          {product.descripcion}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold" style={{ color: 'rgb(var(--primary))' }}>
            ${product.precio.toFixed(2)}
          </span>
          
          {product.stock > 0 ? (
            <span className="text-xs px-2 py-1 rounded" style={{
              backgroundColor: 'rgba(0, 166, 153, 0.1)',
              color: 'rgb(var(--secondary))'
            }}>
              En stock
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded" style={{
              backgroundColor: 'rgba(255, 90, 95, 0.1)',
              color: 'rgb(var(--primary))'
            }}>
              Agotado
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-dark-300">
        <button
          onClick={handleAddToCart}
          className={"w-full btn py-2 rounded-md text-sm font-medium transition-all duration-200"}
          style={{
            backgroundColor: 'rgb(var(--primary))',
            color: 'white'
          }}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}