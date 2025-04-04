# Naiki - Tienda Online

## Descripción
Naiki es una plataforma de comercio electrónico desarrollada con **Next.js**, **React Query** y **Tailwind CSS**. Sus funciones principales son permitir a los usuarios explorar productos, filtrar por categorías y gestionar un carrito de compras.

## Características
- **Gestión de carrito de compras**:
  - Agregar, eliminar y limpiar productos del carrito.
  - Persistencia del carrito con `localStorage`.
- **Estilización moderna**:
  - Uso de Tailwind CSS con personalizaciones en `globals.css`.
- **Manejo de datos asíncronos**:
  - React Query para obtener productos y categorías.
- **Cálculo de totales**:
  - Subtotal, impuestos y total del carrito.

## Instalación y ejecución local
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd go-prints-platform

2. Instala las dependencias:
   ```bash
   npm install

3. Ejecuta el servidor local:
   ```bash
   npm run dev

4. Abre el navegador en http://localhost:3000

Decisiones técnicas y arquitectónicas
- **Next.js**: Elegido por su capacidad para renderizado, precarga, manejo de rutas + integración con React y Typescript.
- **React Query**: Para manejar datos asíncronos de manera eficiente.
- **Tailwind CSS**: Para una estilización rápida y consistente.
- **Enrutamiento**: Para un manejo versatil de archivos.
- **localStorage**: Para persistir el estado del carrito en el cliente.

Desafíos enfrentados
- Novato en Next.js y Tailwind:
  Al no tener tanto contacto con estas tecnologías, tuve que ver tutoriales para saber el funcionamiento principal de los modulos.
- Problemas con Tailwind CSS:
  Revisar la configuración de tailwind.config.ts y postcss.config.mjs, y asegurarse de que los archivos correctos estén en el array content.
- Persistencia del carrito:
  Implementar localStorage y sincronizarlo con React Query.
- Despliegue en Vercel:
  Configurar correctamente las rutas y variables de entorno.
