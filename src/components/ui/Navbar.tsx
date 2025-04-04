'use client';

import Link from "next/link";
import { useState } from 'react';

import { CartButton } from "../Cart/CartButton";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Botón de menú para móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <h1 className="text-white font-bold ml-2 md:ml-0">
            Naiki®
          </h1>

          {/* Menú para desktop (oculto en móvil) */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Carrito */}
          <div className="flex items-center">
            <CartButton />
          </div>
        </div>
      </div>

      {/* Menú móvil (aparece desde la izquierda) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-bold">Menú</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-white focus:outline-none"
            aria-label="Cerrar menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <NavLinks vertical />
        </div>
      </div>

      {/* Overlay (solo visible cuando el menú está abierto) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}

// Componente auxiliar para los links (reutilizable)
function NavLinks({ vertical = false }: { vertical?: boolean }) {
  const linkClass = "text-white hover:text-gray-300 transition-colors";
  
  return (
    <div className={`flex ${vertical ? 'flex-col space-y-4' : 'space-x-6'}`}>
      <Link href={'/'} className={linkClass}>
        Inicio
      </Link>
      <Link href={'/mi-cuenta'} className={linkClass}>
        Mi Cuenta
      </Link>
      <Link href={'/productos'} className={linkClass}>
        Productos
      </Link>
      <Link href={'/favoritos'} className={linkClass}>
        Favoritos
      </Link>
    </div>
  );
}