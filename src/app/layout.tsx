'use client'

import { Inter } from "next/font/google";
import React from "react";

import { CartDrawer } from "@/components/Cart/CartDrawer";
import { Navbar } from "@/components/ui/Navbar";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from "@/context/FavoritesContext";
import { OrderProvider } from '@/context/OrderContext'
import QueryProvider from "@/providers/QueryProvider";

import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <OrderProvider>
                  <AccessibilityProvider>
                    {/* Componente para manejo de teclado */}
                    <TabKeyHandler />
                    
                    {/* Barra de navegación accesible */}
                    <Navbar />
                    
                    {/* Contenido principal con skip link */}
                    <a 
                      href="#main-content" 
                      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:p-2 focus:z-50"
                    >
                      Saltar al contenido principal
                    </a>
                    
                    <main id="main-content">
                      {children}
                    </main>
                    
                    {/* Sidebar del carrito */}
                    <CartDrawer />
                    
                    {/* Footer accesible */}
                  </AccessibilityProvider>
                </OrderProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

function TabKeyHandler() {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
}