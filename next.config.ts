/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Permitir rutas para imagenes del home
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
        pathname: '/stores/**',
      },
      {
        protocol: 'https',
        hostname: 'underarmour.scene7.com',
        pathname: '/is/image/**',
      },
      {
        protocol: 'https',
        hostname: 'ejemplo.com',
      },
      {
        protocol: 'https',
        hostname: '**.ejemplo.com',
      },
      // Permitir rutas para imagenes de supabase
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    unoptimized: false,
  },
};

module.exports = nextConfig;