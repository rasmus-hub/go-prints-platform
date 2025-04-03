'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import CategoryFilter from '@/components/productos/CategoryFilter';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/Pagination';
import { getProducts, getCategories, type Product } from '@/services/products';

import ProductCard from './ProductCard';

const PAGE_SIZE = 8;

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
        enabled: !isInitialLoad
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
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <p className="text-light-200 max-w-2xl mx-auto">
                    Descubre nuestra exclusiva colección de productos de alta calidad
                </p>
            </div>
            
            <div className="mb-12 bg-dark-200 rounded-xl p-6 shadow-lg">
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
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
                ) : displayedProducts.length === 0 ? (
                <div className="text-center py-16 bg-dark-200 rounded-xl">
                    <p className="text-xl text-light-200">No se encontraron productos</p>
                    <button 
                    onClick={() => setSelectedCategory(undefined)}
                    className="mt-4 px-6 py-2 bg-primary hover:bg-primary-light rounded-lg font-medium"
                    >
                    Ver todos los productos
                    </button>
                </div>
                ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedProducts.map((product) => (
                        <div key={`${product.id}-${page}`} className="h-full">
                        <ProductCard product={product} />
                        </div>
                    ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
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