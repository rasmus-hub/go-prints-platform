/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejemplo.com',
        // Opcional: restringir a paths específicos
        // pathname: '/imagenes/**',
      },
      // Añade aquí otros dominios que uses
      {
        protocol: 'https',
        hostname: '**.ejemplo.com', // Para subdominios
      },
      // Si usas imágenes de Supabase Storage
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Opcional: desactivar optimización en desarrollo
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;