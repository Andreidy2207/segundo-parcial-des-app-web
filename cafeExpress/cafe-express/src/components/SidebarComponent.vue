<template>
  <div class="d-flex flex-column bg-dark text-white border-end shadow-sm" style="width:220px; min-height:100vh;">
    
    <!-- PERFIL / NEGOCIO -->
    <div class="p-3 border-bottom border-secondary text-center">
      <img 
        src="https://perfectdailygrind.com/wp-content/uploads/2020/04/Berlin_cappuccino_2_Melanie-Bo%CC%88hme.-32-1024x683.jpg"
        alt="Logo" class="rounded-circle mb-2" width="55" height="55" style="object-fit:cover;"
      >
      <p class="mb-0 fw-bold small">Café Express</p>
      <span class="badge bg-warning text-dark small">Administrador</span>
    </div>

    <!-- NAVEGACIÓN -->
    <ul class="nav flex-column flex-grow-1 p-2">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-white d-flex align-items-center gap-2 rounded mb-1">
          <i class="bi bi-house-door"></i> Inicio
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link text-white d-flex align-items-center gap-2 rounded mb-1">
          <i class="bi bi-cup-hot"></i> Productos
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/clientes" class="nav-link text-white d-flex align-items-center gap-2 rounded mb-1">
          <i class="bi bi-people"></i> Clientes
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link text-white d-flex align-items-center gap-2 rounded mb-1">
          <i class="bi bi-box-seam"></i> Inventario
        </router-link>
      </li>
    </ul>

    <!-- CERRAR SESIÓN ABAJO -->
    <div class="p-3 border-top border-secondary">
      <button 
        class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
        @click="handleLogout"
      >
        <i class="bi bi-box-arrow-right"></i> Cerrar sesión
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('usuario');
  router.push('/login');
};
</script>

<style scoped>
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.router-link-active {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ffc107 !important;
  font-weight: 600;
}
</style>