'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useCart } from '@/hooks/useCart';
import type { Product, ProductVariant } from '@/services/products';

import ProductCard from './ProductCard';

export default function ProductDetail({ 
  product, 
  relatedProducts 
}: { 
  product: Product; 
  relatedProducts: Product[]; 
}) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    const { addToCart } = useCart();

    const hasVariants = (product.variantes?.length ?? 0) > 0;

    const handleAddToCart = () => {
        const cartItem = {
            productId: product.id,
            varianteId: selectedVariant?.id || undefined,
            cantidad: 1,
            precio: selectedVariant?.precio ?? product.precio,
            nombre: product.nombre,
            imagen: selectedVariant?.imagen_url ?? product.imagen_url,
        };

        console.log('Añadiendo al carrito:', cartItem);
        addToCart(cartItem);
        alert(`${product.nombre} añadido al carrito`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Galería de imágenes */}
                <div className="grid grid-cols-1 gap-4">

                    {/* Información del producto */}
                    <div>
                    <h1 className="text-3xl font-bold mb-2">{product.nombre}</h1>
                    <p className="text-gray-600 mb-4">{product.categoria}</p>

                    <Image 
                        src={product.imagen_url}
                        alt={product.nombre}
                        width={300}
                        height={300}
                        className="w-full object-cover mb-5"
                    />
                    
                    <div className="text-2xl font-bold text-primary mb-6">
                        ${selectedVariant?.precio ? selectedVariant.precio.toFixed(2) : product.precio.toFixed(2)}
                    </div>

                    <p className="mb-6">{product.descripcion}</p>

                    {/* Variantes */}
                    {product.variantes && product.variantes.length > 0 ? (
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Opciones:</h3>
                            <div className="flex flex-wrap gap-2">
                            {product.variantes.map((variant) => (
                                <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 border rounded-full text-sm ${
                                    selectedVariant?.id === variant.id
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                >
                                {variant.nombre}
                                </button>
                            ))}
                            </div>
                        </div>
                        ) : (
                        <div className="mb-6 text-sm text-gray-500">
                            Este producto no tiene opciones disponibles
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={hasVariants && !selectedVariant}
                        className={`w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg transition-colors ${
                            hasVariants && !selectedVariant ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {hasVariants && !selectedVariant 
                            ? 'Selecciona una opción' 
                            : 'Añadir al Carrito'}
                    </button>
                </div>
            </div>

            {/* Productos relacionados */}
            {(relatedProducts && relatedProducts.length > 0) && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">
                    {relatedProducts[0]?.categoria === product.categoria 
                        ? 'Productos Relacionados' 
                        : 'Otros Productos Destacados'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                        <ProductCard key={`related-${relatedProduct.id}`} product={relatedProduct} />
                    ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}