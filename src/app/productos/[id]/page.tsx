'use client';

import { useQuery } from '@tanstack/react-query';
import { use } from 'react'; // Importa el hook use

import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getProductById, getRelatedProducts, type Product } from '@/services/products';

import ProductDetail from '../ProductDetail';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  
    const { 
      data: product, 
      isLoading, 
      isError, 
      error 
    } = useQuery({
      queryKey: ['product', id],
      queryFn: () => getProductById(id),
    });
  
    const { data: relatedProducts } = useQuery({
        queryKey: ['related-products', id],
        queryFn: () => getRelatedProducts(id, product?.categoria || ''),
        enabled: !!product?.categoria,
    });
  
    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error instanceof Error ? error.message : 'Error al cargar el producto'} />;
  
    return (
      <ProductDetail 
        product={product!} 
        relatedProducts={relatedProducts || []} 
      />
    );
}