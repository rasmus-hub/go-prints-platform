'use client'

import Link from 'next/link'

export default function CompraExitosa() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto bg-dark-200 p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">¡Compra realizada con éxito!</h1>
        <p className="mb-6">Gracias por tu compra. Tu pedido ha sido registrado.</p>
        <div className="flex flex-col space-y-4">
          <Link 
            href="/mi-cuenta" 
            className="px-4 py-2 bg-primary hover:bg-primary-dark rounded text-white"
          >
            Ver mis pedidos
          </Link>
          <Link 
            href="/productos" 
            className="px-4 py-2 border border-primary text-primary hover:bg-dark-300 rounded"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}