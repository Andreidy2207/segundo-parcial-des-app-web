<template>
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body shadow-sm" data-bs-theme="dark">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/dashboard">
        <img 
          src="https://perfectdailygrind.com/wp-content/uploads/2020/04/Berlin_cappuccino_2_Melanie-Bo%CC%88hme.-32-1024x683.jpg" 
          alt="Logo" width="40" height="30" class="d-inline-block align-text-top me-2 rounded"
        >
        <span class="fw-bold">Café Express</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link d-flex align-items-center" to="/dashboard">
              <i class="bi bi-house-door me-1"></i> Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link d-flex align-items-center" to="/dashboard/productos">
              <i class="bi bi-cup-hot me-1"></i> Productos
            </router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <form class="d-flex" role="search">
          </form>
          <!-- BOTÓN CERRAR SESIÓN -->
          <button class="btn btn-outline-danger d-flex align-items-center gap-1" @click="handleLogout">
            <i class="bi bi-box-arrow-right"></i>
            <span class="d-none d-lg-inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('usuario');
  router.push('/login');
};
</script>