import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { getProductById, type Product } from '@/services/products';

export default function ProductCard({ product }: { product: Product }) {
  const queryClient = useQueryClient();

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => getProductById(String(product.id)),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-4 flex-grow flex flex-col">
        <Link
          href={`/productos/${product.id}`}
          onMouseEnter={prefetchProduct}
        >
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.nombre}</h3>
        </Link>
        <Image 
            src={product.imagen_url}
            alt={product.nombre}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
        />
        <p className="text-gray-600 text-sm mb-2 line-clamp-3 flex-grow">{product.descripcion}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-primary">${product.precio.toFixed(2)} </span>
          {product.stock > 0 ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              En stock
            </span>
          ) : (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
              Agotado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}