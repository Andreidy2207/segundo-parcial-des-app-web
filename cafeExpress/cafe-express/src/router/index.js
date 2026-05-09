// createRouter: crea la instancia del enrutador
// createWebHistory: usa el historial del navegador (URLs limpias sin #)
import { createRouter, createWebHistory } from 'vue-router'

import LoginView     from '../views/LoginView.vue'   
import DashboardView from '../views/DashboardView.vue' 
import ProductView   from '../views/ProductView.vue'   


// Cada objeto representa una ruta de la aplicación
const routes = [

  // Ruta raíz: redirige automáticamente al login así el usuario nunca queda en una ruta vacía
  {
    path: '/',
    redirect: '/login'
  },

  // Ruta de Login accesible sin autenticación
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

  // Ruta del Dashboard (ruta padre)
  // meta.requiresAuth: true indica que necesita sesión activa, contiene rutas hijas que se renderizan dentro del <router-view> del DashboardView
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }, // 🔒 Ruta protegida
    children: [

      // Ruta hija: Gestión de productos (CRUD)
      // URL completa: /dashboard/productos se renderiza dentro del DashboardView sin perder Navbar ni Sidebar
      {
        path: 'productos',       // ⚠️ Sin slash inicial al ser ruta hija
        name: 'Productos',
        component: ProductView
      }
    ]
  }
]

const router = createRouter({
  // createWebHistory() genera URLs limpias: /login, /dashboard/productos
  history: createWebHistory(),
  routes
})

// ── Guard de navegación global 
// Se ejecuta ANTES de cada cambio de ruta
// Parámetros:
//   to   → ruta a la que el usuario quiere ir
//   from → ruta desde donde viene
//   next → función que autoriza o redirige la navegación
router.beforeEach((to, from, next) => {

  // Verificamos si hay un usuario guardado en localStorage
  const isAuthenticated = localStorage.getItem('usuario')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 🚫 Intenta acceder a ruta protegida sin sesión → redirige al login
    next('/login')

  } else if (to.path === '/login' && isAuthenticated) {
    // ✅ Ya tiene sesión activa e intenta ir al login → redirige al dashboard
    next('/dashboard')

  } else {
    next()
  }
})

export default router