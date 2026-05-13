## segundo parcial de desarrollo de aplicaciones web
# ☕ Café Express — Aplicación Web Modularizada

> Proyecto desarrollado para el **Segundo Parcial de Desarrollo de Aplicaciones Web**  
> Universidad Francisco de Paula Santander Ocaña — UFPSO 2026

>Estudiantes
> David Andreidy Coronel Coronel - 0192610
> Yaneidy Sepúlveda Sepúlveda - 0192568
> Yesica Paola Bayona Moreno - 0192625


---

## 📌 Descripción General

**Café Express** es una aplicación web de gestión para una cafetería, desarrollada con **Vue.js 3** y **Bootstrap CSS**. Permite administrar el inventario de productos (bebidas y alimentos), autenticar usuarios mediante un archivo JSON local y navegar entre vistas de forma dinámica gracias a **Vue Router**.

La aplicación está construida de forma **modular y componentizada**, separando responsabilidades en componentes reutilizables, vistas independientes y un sistema de rutas protegidas.

> ⚠️ **Nota importante:** El sistema de autenticación implementado en esta aplicación es únicamente con fines **educativos y demostrativos**. Las credenciales se validan contra un archivo JSON local y se almacenan en `localStorage`. Esto **no representa un sistema de autenticación seguro** para entornos de producción.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| Vue.js 3 | Framework principal (Composition API y Options API) |
| Vue Router 4 | Navegación entre vistas y rutas protegidas |
| Bootstrap 5 | Estilos, componentes UI y diseño responsivo |
| Bootstrap Icons | Iconografía en menús, botones y tarjetas |
| localStorage | Persistencia simulada de datos (CRUD de productos) |
| JSON | Fuente de datos para usuarios y productos |

---

## 📁 Estructura del Proyecto

```
cafe-express/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── router/
│   │   └── index.js
│   ├── data/
│   │   ├── usuarios.json
│   │   └── products.json
│   ├── components/
│   │   ├── NavbarComponent.vue
│   │   ├── SidebarComponent.vue
│   │   ├── FooterComponent.vue
│   │   └── ProductCardComponent.vue
│   └── views/
│       ├── LoginView.vue
│       ├── DashboardView.vue
│       ├── HomeView.vue
│       └── ProductView.vue
```

---

## 📄 Descripción de Archivos

### `App.vue`
Punto de entrada principal de la aplicación. Contiene únicamente el `<router-view />` que renderiza la vista correspondiente según la ruta activa. No incluye lógica adicional, cumpliendo el principio de responsabilidad única.

---

### `router/index.js`
Configura el sistema de navegación de la aplicación usando `createRouter` y `createWebHistory` para URLs limpias (sin `#`).

**Rutas definidas:**
| Ruta | Vista | Protegida |
|---|---|---|
| `/` | Redirige a `/login` | No |
| `/login` | `LoginView` | No |
| `/dashboard` | `DashboardView` + `HomeView` (hija) | Sí |
| `/dashboard/productos` | `DashboardView` + `ProductView` (hija) | Sí |

Incluye un **guard de navegación global** (`router.beforeEach`) que:
- Redirige al `/login` si el usuario intenta acceder a una ruta protegida sin sesión activa.
- Redirige al `/dashboard` si el usuario ya autenticado intenta volver al `/login`.

La sesión se verifica comprobando si existe la clave `usuario` en `localStorage`.

---

### `data/usuarios.json`
Archivo JSON que actúa como base de datos simulada de usuarios. Contiene las credenciales válidas para acceder a la aplicación.

```json
[
  {
    "user": "User",
    "pass": "24680",
    "name": "Admincafe"
  }
]
```

> ⚠️ Este archivo es solo para fines educativos. En una aplicación real, las credenciales nunca deben almacenarse en texto plano en el frontend.

---

### `data/products.json`
Archivo JSON con los **12 productos** del catálogo inicial de la cafetería, divididos en dos categorías:

- **Bebidas (6):** Cappuccino Italiano, Latte de Vainilla, Mocaccino Especial, Matcha de Leche, Cold Brew Nitro, Flat White.
- **Alimentos (6):** Muffin de Arándanos, Cheesecake de Frutos Rojos, Affogato Premium, Tostada de Aguacate, Croissant de Jamón y Queso, Waffles con Frutas y Miel.

Cada producto contiene: `id`, `nombre`, `descripcion`, `imagen`, `precio`, `estrellas` y `categoria`. Estos datos se precargan en `localStorage` en la primera visita y desde ahí el CRUD opera sobre el almacenamiento local.

---

## 🧩 Componentes

### `NavbarComponent.vue`
Barra de navegación superior fija, presente en todas las vistas del dashboard. Construida con la clase `navbar` de Bootstrap en tema oscuro (`data-bs-theme="dark"`).

**Incluye:**
- Logo e imagen de la cafetería con enlace al inicio.
- Enlace a **Inicio** (`/dashboard`) y **Productos** (`/dashboard/productos`).
- Menú desplegable **Gestión** con accesos a Inventario y Clientes.
- **Buscador de productos** con icono de lupa, funcional en tiempo real.
- **Botón de cerrar sesión** visible en la barra, que elimina la sesión de `localStorage` y redirige al login usando `useRouter` de Vue Router.
- Diseño responsivo con `navbar-toggler` para pantallas pequeñas.

---

### `SidebarComponent.vue`
Menú lateral de navegación con tema oscuro. Complementa al Navbar ofreciendo acceso rápido a las secciones principales.

**Incluye:**
- Imagen de perfil/logo del negocio con badge de rol (Administrador).
- Enlaces con iconos a: Inicio, Productos, Clientes e Inventario.
- Efecto visual en el enlace activo (`router-link-active`) resaltado en amarillo.
- **Botón de cerrar sesión** ubicado en la parte inferior del sidebar, pegado al fondo usando `flex-grow-1` y `mt-auto`, que limpia la sesión y redirige al login.

---

### `FooterComponent.vue`
Pie de página simple con fondo oscuro (`bg-dark`) presente en todas las vistas del dashboard.

**Muestra:**
- Año actual y nombre del negocio: `© 2026 Café Express`.
- Texto de derechos reservados.

---

### `ProductCardComponent.vue`
Tarjeta individual reutilizable para mostrar la información de un producto del catálogo.

**Recibe por `props`:**
- `producto`: objeto con `nombre`, `descripcion`, `imagen`, `precio`, `estrellas` y `categoria`.

**Emite eventos al componente padre:**
- `@editar`: al hacer clic en el botón Editar, envía el objeto producto completo.
- `@eliminar`: al hacer clic en el botón Eliminar, envía el `id` del producto.

**Características visuales:**
- Imagen con altura fija (`200px`) y `object-fit: cover`.
- Badge de categoría (bebida/alimento).
- Precio formateado en pesos colombianos con `.toLocaleString('es-CO')`.
- Estrellas de valoración.
- Efecto hover de elevación con `transform: translateY(-10px)` y sombra.
- Botones de acción **Editar** (amarillo) y **Eliminar** (rojo) en el footer de la tarjeta.

---

## 🖥️ Vistas

### `LoginView.vue`
Vista de inicio de sesión con diseño personalizado acorde a la identidad visual de la cafetería.

**Funcionalidades:**
- Formulario con campos de usuario y contraseña usando `form-floating` de Bootstrap.
- Validación contra `usuarios.json` buscando coincidencia exacta de `user` y `pass`.
- Si las credenciales son correctas: guarda el usuario en `localStorage` con la clave `usuario` y redirige a `/dashboard`.
- Si son incorrectas: muestra una alerta visual de Bootstrap y limpia el campo de contraseña.
- Usa `<script setup>` con Composition API (`ref`, `useRouter`).

**Diseño:**
- Tarjeta centrada con bordes decorativos en esquinas, color crema (`#FFF9F2`) y tonos café.
- Botón de ingreso con color café (`#6F4E37`) y efecto hover de elevación.
- Emoji ☕ como logo principal.

---

### `DashboardView.vue`
Vista contenedora principal del panel de administración. Actúa como layout para todas las vistas hijas.

**Estructura:**
- `NavbarComponent` en la parte superior.
- Área central con `<router-view>` donde se renderizan las vistas hijas (`HomeView`, `ProductView`).
- `FooterComponent` en la parte inferior.
- Usa `min-vh-100` y `d-flex flex-column` para que el footer siempre quede al fondo.

---

### `HomeView.vue`
Vista de bienvenida que se carga al ingresar al dashboard (`/dashboard`).

**Incluye:**
- Banner fotográfico de la cafetería con imagen a ancho completo.
- Título de bienvenida: **"Bienvenido a Café Express"** con el subtítulo **"¿En qué podemos ayudarte hoy?"**.
- Dos tarjetas de acceso rápido centradas:
  - **Nuestros Productos**: enlace directo a `/dashboard/productos`.
  - **Clientes**: enlace directo a `/dashboard/clientes`.
- Cada tarjeta incluye un ícono de Bootstrap Icons, descripción breve y botón de acción en amarillo.

---

### `ProductView.vue`
Vista principal de gestión del catálogo. Implementa las **4 operaciones CRUD** completas sobre los productos, usando `localStorage` como capa de persistencia simulada.

**Funcionalidades:**

- **Listar (Read):** Muestra todos los productos separados por sección (Bebidas y Alimentos) usando `ProductCardComponent`. Los datos se cargan desde `localStorage`; si no existen, se precargan desde `products.json`.
- **Crear (Create):** Botón "Nuevo Producto" abre un modal con formulario completo. Al guardar, genera un ID único (máximo ID existente + 1) y agrega el producto al array y al `localStorage`.
- **Editar (Update):** Al hacer clic en "Editar" en una tarjeta, el modal se puebla con los datos del producto seleccionado. Al guardar, reemplaza el objeto en el array con `splice` y actualiza `localStorage`.
- **Eliminar (Delete):** Al hacer clic en "Eliminar", se abre un modal de confirmación. Solo elimina si el usuario confirma, filtrando el array y actualizando `localStorage`.

**Otras características:**
- **Buscador en tiempo real**: filtra las tarjetas mientras el usuario escribe, usando computed properties que hacen `.includes()` sobre el nombre del producto (insensible a mayúsculas).
- **Filtro por categoría**: selector desplegable que muestra solo bebidas, solo alimentos o todos.
- **Validación de formulario**: campos obligatorios (nombre, descripción, categoría, precio) con mensajes de error inline usando clases `is-invalid` de Bootstrap.
- **Vista previa de imagen**: muestra la imagen en tiempo real mientras se escribe la URL en el formulario.
- **Alertas automáticas**: mensaje de éxito o advertencia tras cada operación CRUD que desaparece automáticamente a los 4 segundos.
- **Mensaje de sin resultados**: cuando la búsqueda no coincide con ningún producto, muestra un mensaje informativo con botón para limpiar la búsqueda.

---

## 🚀 Instalación y Uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/segundo-parcial-des-app-web.git

# 2. Entrar a la carpeta del proyecto
cd segundo-parcial-des-app-web/cafe-express

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run serve
```

Abrir en el navegador: `http://localhost:8080`

**Credenciales de acceso:**
| Campo | Valor |
|---|---|
| Usuario | `User` |
| Contraseña | `24680` |

---

## 👥 Autores

Proyecto desarrollado en grupo como parte del segundo parcial de la asignatura **Desarrollo de Aplicaciones Web**.

>Estudiantes
> David Andreidy Coronel Coronel - 0192610
> Yaneidy Sepúlveda Sepúlveda - 0192568
> Yesica Paola Bayona Moreno - 0192625

- **Universidad:** Francisco de Paula Santander Ocaña — UFPSO  
- **Año:** 2026

---

> ☕ *"Una taza de energía y un aroma de éxito. Despierta tu vida con cada sorbo."*