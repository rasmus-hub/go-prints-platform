import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import { CartDrawer } from "@/components/Cart/CartDrawer";
import AppWrapper from "@/components/ui/AppWrapper";
import { Navbar } from "@/components/ui/Navbar";
import { CartProvider } from '@/context/CartContext';
import QueryProvider from "@/providers/QueryProvider";

import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoPrints",
  description: "GoPrints Tienda Online",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="es">
        <body className={inter.className}>
          <QueryProvider>
            <CartProvider>
              {/* Tu navbar con CartButton aquí */}
              <Navbar />
              
              {/* Contenido principal */}
              {children}
              
              {/* Sidebar del carrito */}
              <CartDrawer />
            </CartProvider>
          </QueryProvider>
        </body>
      </html>
    );
  }