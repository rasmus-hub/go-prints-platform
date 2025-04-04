import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/hooks/useCart'
import { getProductById, type Product } from '@/services/products'

export default function ProductCard({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites() // Ahora usando el hook correcto

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => getProductById(String(product.id)),
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      productId: product.id,
      cantidad: 1,
      precio: product.precio,
      nombre: product.nombre,
      imagen: product.imagen_url,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  return (
    <Link
      href={`/productos/${product.id}`}
      onMouseEnter={prefetchProduct}
      className="card bg-dark-200 rounded-lg overflow-hidden shadow-md hover:shadow-glow transition-all duration-300 h-full flex flex-col border border-dark-300 group"
      style={{
        '--tw-shadow-glow': '0 0 15px rgba(0, 166, 153, 0.3)',
        '--tw-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      } as React.CSSProperties}
    >
      <div className="relative p-4 flex-grow flex flex-col">
        {/* Botón de favoritos */}
        <button
          onClick={handleToggleFavorite}
          aria-label={isFavorite(product.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2 right-2 z-10 p-2 rounded-full hover:bg-dark-300 transition-colors"
        >
          {isFavorite(product.id) ? (
            <span className="text-red-500 text-xl">❤️</span>
          ) : (
            <span className="text-gray-400 text-xl">🤍</span>
          )}
        </button>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-light-100 group-hover:text-primary transition-colors duration-200">
          {product.nombre}
        </h3>

        <div className="relative aspect-square w-full mb-3 rounded-md overflow-hidden">
          <Image 
            src={product.imagen_url}
            alt={`Imagen de ${product.nombre}`}
            fill
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
          <span className={`text-xs px-2 py-1 rounded ${
            product.stock > 0 
              ? 'bg-green-900/10 text-green-500' 
              : 'bg-red-900/10 text-red-500'
          }`}>
            {product.stock > 0 ? 'En stock' : 'Agotado'}
          </span>
        </div>
      </div>

      <div className="p-4 border-t border-dark-300">
        <button
          onClick={handleAddToCart}
          className="w-full btn py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgb(var(--primary))',
            color: 'white'
          }}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Añadir al Carrito' : 'No disponible'}
        </button>
      </div>
    </Link>
  )
}