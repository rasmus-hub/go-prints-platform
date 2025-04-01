'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import CategoryFilter from '@/components/productos/CategoryFilter';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/Pagination';
import { getProducts, getCategories, type Product } from '@/services/products';

import ProductCard from './ProductCard';

const PAGE_SIZE = 1;

export default function ProductosPage() {
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const { 
        data, 
        isLoading, 
        isError, 
        error,
        isFetching,
        refetch
    } = useQuery({
        queryKey: ['products', page, selectedCategory],
        queryFn: () => getProducts(page, PAGE_SIZE, selectedCategory),
        placeholderData: undefined,
        staleTime: 5000,
        enabled: !isInitialLoad // Solo habilita la consulta después del primer render
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    useEffect(() => {
        if (!isInitialLoad) {
            setPage(1);
            refetch();
        } else {
            setIsInitialLoad(false);
        }
    }, [selectedCategory]);

    const displayedProducts = data?.products || [];

    if (isError) return <ErrorMessage message={error instanceof Error ? error.message : 'Error al cargar productos'} />;

    const totalPages = Math.ceil((data?.totalCount || 0) / PAGE_SIZE);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Nuestros Productos</h1>
            
            <div className="mb-8">
                <CategoryFilter
                    categories={categories || []}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => {
                        setSelectedCategory(category === selectedCategory ? undefined : category);
                    }}
                    onClear={() => setSelectedCategory(undefined)}
                />
            </div>

            {(isLoading || isFetching) && displayedProducts.length === 0 ? (
                <LoadingSpinner />
            ) : displayedProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl">No se encontraron productos</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((product) => (
                            <ProductCard key={`${product.id}-${page}`} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                                disabled={isFetching}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}