# Sistema de Comandas - Restaurante

Proyecto de gestión de comandas integrado con Hacienda (Veri*factu).

## Estructura
- `/backend`: API en Node.js, Express y MongoDB.
- `/frontend`: App Android (en desarrollo).

## Cómo empezar (Backend)
1. Entra a la carpeta `backend`: `cd backend`
2. Instala dependencias: `npm install`
3. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://octaviobeledo:Juanpajarito2026@comanda.gfvtti8.mongodb.net/?appName=Comanda
   JWT_SECRET=MiClaveSuperSecretaDeComandas123!_2026
4. Ejecutar el servidor: `Navegar con cd hasta la carpeta backend y poner: node server.js`