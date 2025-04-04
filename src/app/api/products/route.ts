import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    
    const data = await res.json()
    
    const transformed = data.map((product: any) => ({
      id: product.id.toString(),
      nombre: product.title,
      descripcion: product.description,
      precio: product.price,
      imagen_url: product.image,
      stock: Math.floor(Math.random() * 50),
      categoria: product.category
    }))
    
    return NextResponse.json(transformed)
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al mostrar productos' },
      { status: 500 }
    )
  }
}