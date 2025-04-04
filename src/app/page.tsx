'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    // Datos de ejemplo no funcionales

    const featuredProducts = [
        {
            id: 65745,
            name: "Zapatillas Deportivas",
            image: "https://dcdn-us.mitiendanube.com/stores/001/163/841/products/9210-azul-varon1-00b3378b0710fbe45116818509530936-1024-1024.jpg",
            price: 89.99
        },
        {
            id: 213123,
            name: "Camisetas Premium",
            image: "https://underarmour.scene7.com/is/image/Underarmour/V5-1361518-847_FC?rp=standard-0pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=566&hei=708&size=566,708",
            price: 29.99
        }
    ];

    const quickLinks = [
        { name: "Nuevos Lanzamientos", href: "/productos?filter=new", icon: "🆕" },
        { name: "Ofertas Especiales", href: "/productos?filter=deals", icon: "🔥" },
        { name: "Colección Verano", href: "/productos?category=summer", icon: "☀️" }
    ];

    return (
        <div className="bg-dark-100 text-light-100 min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-96 overflow-hidden">
            <Image
            src="/images/hero-banner.jpg"
            alt="Naiki - Calzado y Ropa Premium"
            fill
            className="object-cover opacity-90"
            priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">NAIKI®</h1>
            <p className="text-xl mb-8 max-w-2xl">Descubre lo último en calzado y ropa deportiva</p>
            <Link 
                href="/productos" 
                className="px-8 py-3 bg-primary hover:bg-primary-dark rounded-lg text-lg font-medium transition-colors"
            >
                Ver Colección
            </Link>
            </div>
        </section>

        {/* Quick Access */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Accesos Rápidos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
                <Link 
                key={link.name}
                href={link.href}
                className="bg-dark-200 p-6 rounded-lg hover:shadow-glow transition-all flex flex-col items-center"
                >
                <span className="text-3xl mb-3">{link.icon}</span>
                <h3 className="text-xl font-semibold text-center">{link.name}</h3>
                </Link>
            ))}
            </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Productos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product) => (
                <div key={product.id} className="bg-dark-200 rounded-lg overflow-hidden hover:shadow-glow transition-all">
                <div className="relative h-100">
                    <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-primary font-bold text-lg">${product.price.toFixed(2)}</p>
                    <Link 
                    href={`/productos/${product.id}`}
                    className="mt-4 inline-block text-sm font-medium hover:underline"
                    >
                    Ver detalles →
                    </Link>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-dark-200">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Únete a nuestra comunidad</h2>
            <p className="mb-8 max-w-2xl mx-auto">
                Recibe ofertas exclusivas y sé el primero en conocer nuestros nuevos lanzamientos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                type="email" 
                placeholder="Tu email" 
                className="flex-grow px-4 py-2 rounded bg-dark-100 border border-dark-300 text-light-100 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-2 bg-primary hover:bg-primary-dark rounded font-medium transition-colors">
                Suscribirse
                </button>
            </div>
            </div>
        </section>
        </div>
    );
}