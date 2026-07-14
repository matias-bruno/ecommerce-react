# E-commerce React con Firebase

Este proyecto es una tienda online desarrollada con React, Vite y Firebase como parte de un curso de React. Incluye funcionalidades típicas de un e-commerce moderno: catálogo de productos, detalle del producto, carrito, búsqueda, autenticación de usuarios, favoritos y un panel de administración para gestionar productos.

## 🚀 Características

- Catálogo de productos con vista previa y detalle
- Búsqueda de productos
- Carrito de compras con agregar, quitar y vaciar productos
- Autenticación de usuarios con Firebase
- Favoritos por usuario
- Panel de administración para crear y editar productos
- Diseño responsive
- Integración con Firestore y subida de imágenes con ImgBB

## 🛠️ Tecnologías utilizadas

- React 19
- Vite
- React Router DOM
- Firebase (Auth y Firestore)
- CSS Modules
- SweetAlert2
- ESLint

## 📋 Requisitos previos

- Node.js 18 o superior
- npm o yarn
- Una cuenta de Firebase configurada
- Una API key de ImgBB para subir imágenes

## ⚙️ Instalación

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd ecommerce-react
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_IMGBB_API_KEY=tu_imgbb_api_key
   ```

4. Inicia el proyecto:
   ```bash
   npm run dev
   ```

## ▶️ Scripts disponibles

- `npm run dev` → inicia el proyecto en modo desarrollo
- `npm run build` → genera la build de producción
- `npm run preview` → previsualiza la build
- `npm run lint` → ejecuta ESLint

## 🌐 Despliegue

La aplicación está desplegada en Vercel y está disponible en:

- https://ecommerce-react-ten-hazel.vercel.app/

## 📁 Estructura del proyecto

```text
src/
├── components/
├── context/
├── firebase/
├── hooks/
├── pages/
└── assets/
```

## 🧩 Notas importantes

Para que el proyecto funcione correctamente, tu proyecto de Firebase debe tener configuradas las colecciones y reglas necesarias para productos, categorías y usuarios. Además, la carga de imágenes depende de la API de ImgBB.

## 👤 Autor

Proyecto realizado por Matías Bruno como parte de un curso de React.
