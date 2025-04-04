'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import React from 'react';

import { useCartContext } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useCart } from '@/hooks/useCart'

export function CartDrawer() {
  const { isOpen, closeCart } = useCartContext()
  const { carrito, removeFromCart, subtotal, impuestos, total, count, clearCart } = useCart()
  const { addOrder } = useOrders()
  const router = useRouter()

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (carrito.length === 0) return
    
    addOrder([...carrito], total)
    
    clearCart()
    
    router.push('/compra-exitosa')
    
    closeCart()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute bg-black bg-opacity-75 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-dark-100 shadow-xl border-dark-300">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-light-100">Carrito de compras</h2>
                <button
                  type="button"
                  className="p-2 text-light-200 hover:text-primary rounded-full hover:bg-dark-200"
                  onClick={closeCart}
                >
                  {/* Icono de cerrar */}
                </button>
              </div>

              {/* Lista de productos */}
              <div className="mt-8">
                <div className="flow-root">
                  {count === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-light-200">Tu carrito está vacío</p>
                      <button
                        onClick={closeCart}
                        className="mt-4 px-4 py-2 bg-primary hover:bg-primary-light rounded-md text-sm font-medium"
                      >
                        Continuar comprando
                      </button>
                    </div>
                  ) : (
                    <ul className="-my-6 divide-y divide-dark-300">
                      {carrito.map((item) => (
                        <li key={`${item.productId}-${item.varianteId || ''}`} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-dark-300">
                            <Image
                              src={item.imagen}
                              alt={item.nombre}
                              width={300}
                              height={300}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-light-100">
                                <h3>{item.nombre}</h3>
                                <p className="ml-4">${(item.precio * item.cantidad).toFixed(2)}</p>
                              </div>
                              {item.varianteId && (
                                <p className="mt-1 text-sm text-light-200">Variante: {item.varianteId}</p>
                              )}
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-light-200">Cantidad: {item.cantidad}</p>
                              <button
                                type="button"
                                className="font-medium text-primary hover:text-primary-light"
                                onClick={() => removeFromCart({
                                  productId: item.productId,
                                  varianteId: item.varianteId
                                })}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {count > 0 && (
              <div className="border-t border-dark-300 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-light-100">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-light-100 mt-2">
                  <p>Impuestos (16%)</p>
                  <p>${impuestos.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-xl font-bold text-light-100 mt-4 pt-4 border-t border-dark-300">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark hover:shadow-glow-primary"
                  >
                    Finalizar compra
                  </button>
                </div>
                <div className="mt-4 flex justify-center text-sm text-light-200">
                  <button
                    type="button"
                    className="font-medium text-secondary hover:text-secondary-light"
                    onClick={closeCart}
                  >
                    Continuar comprando
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}