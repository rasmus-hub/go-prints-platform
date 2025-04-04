'use client';

import Link from "next/link";

import { CartButton } from "../Cart/CartButton";

export function Navbar() {
  return (
    <nav className="bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Otros elementos de tu navbar */}
          <h1 className="absolute left-0 flex mt-2 ml-2">
            Naiki®
          </h1>
          <div className="flex items-center gap-20">
            <Link href={'/'}>
              <p>Inicio</p>
            </Link>
            <Link href={'/mi-cuenta'}>
              <p>Mi Cuenta</p>
            </Link>
            <Link href={'/productos'}>
              <p>Productos</p>
            </Link>
            <Link href={'/favoritos'}>
              <p>Favoritos</p>
            </Link>
          </div>
          <div className="absolute right-0 flex mt-2 mr-2">
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}