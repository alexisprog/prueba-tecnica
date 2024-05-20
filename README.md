# Prueba Técnica

Este repositorio contiene el código fuente de la aplicación "prueba-tecnica", que consta de dos partes: `backend` y `frontend-app`.

## Backend

El backend está desarrollado en Node.js utilizando Express y MongoDB. Asegúrate de tener instalado Node.js (versión 18 o superior) y MongoDB en tu sistema antes de continuar.

### Instalación

1. Navega a la carpeta `backend`: cd backend

2. Instala las dependencias utilizando npm o yarn: yarn install o npm install

### Configuración de variables de entorno

Antes de ejecutar el backend, asegúrate de configurar las variables de entorno necesarias. Puedes encontrar un archivo de ejemplo llamado `.env.example` en la carpeta `backend`. Copia ese archivo y renómbralo a `.env`, luego completa los valores de las variables según tu entorno.

### Ejecución

Para levantar el backend, utiliza el siguiente comando: npm run start o yarn start

Esto iniciará el servidor en el puerto especificado en las variables de entorno.

## Frontend

El frontend de la aplicación está desarrollado en TypeScript utilizando Vite para React. Asegúrate de tener instalado Node.js (versión 18 o superior) en tu sistema antes de continuar.

### Instalación

1. Navega a la carpeta `frontend-app`: cd frontend-app

2. Instala las dependencias utilizando npm o yarn: yarn install o npm install

### Configuración de variables de entorno

Antes de ejecutar el frontend, asegúrate de configurar las variables de entorno necesarias. Puedes encontrar un archivo de ejemplo llamado `.env.example` en la carpeta `frontend-app`. Copia ese archivo y renómbralo a `.env`, luego completa los valores de las variables según tu entorno.

### Ejecución

Para levantar el frontend en modo de desarrollo, utiliza el siguiente comando: npm run dev o yarn dev

Esto iniciará la aplicación y podrás acceder a ella desde tu navegador en la dirección especificada durante la ejecución.
