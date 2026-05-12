# Viandas Chanetón

Sitio web completo para el negocio de viandas con panel de administración.

## Stack

- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Frontend**: React 18 + Vite + React Router v6
- **CSS**: Plain CSS con custom properties (sin Tailwind/PostCSS)

## Requisitos

- Node.js 18+
- PostgreSQL corriendo en `localhost:5432`
  - Usuario: `postgres`
  - Contraseña: `postgres`
  - Base de datos: `viandas_chaneton` (se crea automáticamente)

## Instalación

```bash
# Instalar dependencias del backend
cd backend && npm install

# Instalar dependencias del frontend
cd ../frontend && npm install

# Crear la base de datos y ejecutar migraciones + seed
cd ../backend && npm run db:migrate
```

## Ejecutar en desarrollo

Abrir dos terminales:

**Terminal 1 — Backend (puerto 3001):**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend (puerto 5173):**
```bash
cd frontend && npm run dev
```

Luego visitar: [http://localhost:5173](http://localhost:5173)

## Panel de Administración

- URL: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
- Contraseña: `admin123`

El admin permite gestionar:
- **Productos** — crear, editar, activar/desactivar, destacar
- **Categorías** — crear y administrar categorías del menú
- **Configuración** — textos del sitio, número de WhatsApp, horarios, redes sociales

## Modo Debug

Agregar `?debug=true` a cualquier URL para activar el modo debug:

```
http://localhost:5173/?debug=true
http://localhost:5173/admin/login?debug=true
```

En modo debug:
- Aparece un banner rojo en la parte superior
- El formulario de login se pre-completa con `admin123`
- Los formularios de productos y categorías se pre-completan con datos de prueba

También se puede activar permanentemente editando `frontend/.env`:
```
VITE_DEBUG_MODE=true
```

## Variables de entorno

**`backend/.env`** (ya configurado):
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/viandas_chaneton?schema=public"
JWT_SECRET="chaneton_jwt_secret_2024_muy_seguro_123"
ADMIN_PASSWORD="admin123"
PORT=3001
```

**`frontend/.env`** (ya configurado):
```
VITE_DEBUG_MODE=false
```

## Estructura del proyecto

```
julio/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos: Category, Product, Setting
│   │   └── seed.js           # Datos iniciales
│   └── src/
│       ├── index.js          # Entry point Express
│       ├── middleware/auth.js
│       └── routes/           # auth, products, categories, settings
└── frontend/
    └── src/
        ├── components/       # Navbar, Hero, Products, Cart, Footer, etc.
        ├── context/          # Auth, Settings, Cart
        ├── pages/            # Home, AdminLogin, AdminLayout + subpages
        ├── services/api.js   # Todas las llamadas a la API
        └── utils/helpers.js  # isDebugMode, formatPrice, buildWhatsAppUrl
```

## Carrito / WhatsApp

El carrito NO es e-commerce. Al hacer "Enviar pedido", se genera un mensaje formateado y se abre WhatsApp con el número configurado en el panel de administración.

---

Desarrollado por [ZigoDev](https://zigodev.com.ar)
