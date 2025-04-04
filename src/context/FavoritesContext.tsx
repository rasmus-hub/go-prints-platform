'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type FavoriteContextType = {
  favorites: string[]
  addFavorite: (productId: string) => void
  removeFavorite: (productId: string) => void
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

const FavoritesContext = createContext<FavoriteContextType | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Error parsing favorites', e)
      }
    }
  }, [])

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (productId: string) => {
    if (!favorites.includes(productId)) {
      setFavorites(prev => [...prev, productId])
    }
  }

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId))
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const isFavorite = (productId: string) => {
    return favorites.includes(productId)
  }

  return (
    <FavoritesContext.Provider 
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}