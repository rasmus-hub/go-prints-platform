import { supabase } from '@/lib/supabase';

export type ProductVariant = {
    id: string;
    nombre: string;
    precio: number;
    sku?: string;
    stock: number;
    imagen_url: string;
    product_id: string;
};

export type Product = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen_url: string;
    categoria: string;
    stock: number;
    created_at?: string;
    updated_at?: string;
    
    // Nuevas propiedades añadidas para el detalle
    imagenes_adicionales?: string[]; // Array de URLs de imágenes adicionales
    especificaciones?: Record<string, string>; // Especificaciones técnicas
    rating?: number; // Valoración promedio (1-5)
    reviews?: number; // Número de reseñas
    
    // Relaciones
    variantes?: ProductVariant[]; // Array de variantes del producto
};

export const getProducts = async (page: number, pageSize: number, category?: string) => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from('productos')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

    if (category && category !== 'undefined') {
        query = query.eq('categoria', category);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    return {
        products: data as Product[] || [],
        totalCount: count || 0,
    };
};

export const getCategories = async () => {
    const { data, error } = await supabase
        .from('productos')
        .select('categoria')
        .neq('categoria', null);

    if (error) throw error;

    const uniqueCategories = Array.from(new Set(data.map(item => item.categoria)));
    return uniqueCategories as string[];
};

export const getProductById = async (id: string): Promise<Product> => {
    const { data: productData, error: productError } = await supabase
        .from('productos')
        .select('*')
        .eq('id', id)
        .single();
  
    if (productError) throw productError;
  
    const { data: variantsData, error: variantsError } = await supabase
        .from('variantes_producto')
        .select('*')
        .eq('product_id', id);
  
    if (variantsError) throw variantsError;
  
    return {
      ...productData,
      variantes: variantsData || []
    };
};
  
export const getRelatedProducts = async (productoId: string, categoria: string): Promise<Product[]> => {
    const { data: sameCategory } = await supabase
        .from('productos')
        .select('*')
        .eq('categoria', categoria)
        .neq('id', productoId)
        .limit(4);
  
    if (sameCategory && sameCategory.length > 0) {
        return sameCategory;
    }

    const { data: fallbackProducts } = await supabase
        .from('productos')
        .select('*')
        .neq('id', productoId)
        .order('created_at', { ascending: false })
        .limit(4);
  
    return fallbackProducts || [];
};