'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { useFavorites } from '@/context/FavoritesContext'
import { getProductById } from '@/services/products'
import { Product } from '@/services/products'

export default function FavoritesPage() {
  const { favorites, removeFavorite, isFavorite } = useFavorites()

  // Obtener datos de los productos favoritos
  const { data: favoriteProducts, isLoading } = useQuery({
    queryKey: ['favoriteProducts', favorites],
    queryFn: async () => {
      const products = await Promise.all(
        favorites.map(id => getProductById(id))
      )
      return products.filter(Boolean) as Product[]
    },
    enabled: favorites.length > 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-light-100">Mis Favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg">
          <p className="text-lg mb-4 text-light-200">No tienes productos favoritos aún</p>
          <Link 
            href="/productos" 
            className="text-primary hover:underline font-medium"
          >
            Explorar productos
          </Link>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts?.map(product => (
            <div 
              key={product.id} 
              className="bg-dark-200 rounded-lg overflow-hidden shadow-md border border-dark-300 hover:shadow-glow transition-all duration-300"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={product.imagen_url}
                  alt={product.nombre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-light-100 line-clamp-2">
                  {product.nombre}
                </h3>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-primary">
                    ${product.precio.toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => removeFavorite(product.id)}
                    className="text-sm px-3 py-1 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    aria-label={`Eliminar ${product.nombre} de favoritos`}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}