'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import { CartItem } from '@/hooks/useCart'

type Order = {
  id: string
  date: Date
  items: CartItem[]
  total: number
}

type OrderContextType = {
  orders: Order[]
  addOrder: (items: CartItem[], total: number) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date(),
      items,
      total
    }
    setOrders(prev => [newOrder, ...prev])
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}