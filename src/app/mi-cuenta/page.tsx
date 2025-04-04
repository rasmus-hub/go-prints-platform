'use client'

import Link from 'next/link'

import { useAuth } from '@/context/AuthContext'
import { useOrders } from '@/context/OrderContext'

export default function MiCuentaPage() {
  const { user, logout } = useAuth()
  const { orders } = useOrders()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl mb-4">Debes iniciar sesión para ver esta página</h2>
        <Link href="/login" className="text-primary hover:underline">
          Ir a inicio de sesión
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mi Cuenta</h1>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-dark-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Información</h2>
          <p className="mb-2"><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Historial de Pedidos</h2>
          
          {orders.length === 0 ? (
            <div className="bg-dark-200 p-6 rounded-lg text-center">
              <p>No tienes pedidos recientes</p>
              <Link href="/productos" className="text-primary hover:underline mt-2 inline-block">
                Ir a productos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-dark-200 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      Pedido #{order.id.slice(-6)}
                    </h3>
                    <span className="text-sm text-light-200">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="border-t border-dark-300 pt-4 mt-2">
                    {order.items.map(item => (
                      <div key={`${order.id}-${item.productId}`} className="flex justify-between py-2">
                        <div>
                          <p>{item.nombre}</p>
                          <p className="text-sm text-light-200">
                            {item.cantidad} x ${item.precio.toFixed(2)}
                          </p>
                        </div>
                        <p>${(item.precio * item.cantidad).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-dark-300 pt-4 mt-4 flex justify-between font-medium">
                    <p>Total:</p>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}