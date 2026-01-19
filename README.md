# Frontend - Sistema de Denuncias

## Requisitos
- Node.js 18.0+
- NPM 9.0+

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env en la raíz del proyecto
```

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Si usas **Vite**, crear `.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
# 3. Iniciar servidor de desarrollo
npm run dev

```

El frontend estará disponible en:  `http://localhost:5173` con Vite

## Probar

1. Asegúrate que el backend esté corriendo en `http://localhost:8000`
2. Abre el navegador en `http://localhost:5173`
3. Ve a "Consultar Denuncia"
4. Ingresa el código: `DEN-2026-HXQ1CR`
5. Haz clic en "Buscar"

## Configurar Axios (src/services/api.js)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
```

## Build para Producción

```bash
# Generar build
npm run build

# Preview del build
npm run preview
```

## Solución de Problemas

```bash
# Error de conexión con backend
# Verifica que el backend esté corriendo:
curl http://localhost:8000/api/denuncias

# Error "Module not found"
rm -rf node_modules package-lock.json
npm install

# Puerto en uso
# Mata el proceso en puerto 3000:
lsof -i :3000
kill -9 <PID>

