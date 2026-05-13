<template>
  <div class="text-center py-5">

    <!-- IMAGEN BANNER -->
    <div class="mb-4">
      <img 
        src="https://perfectdailygrind.com/wp-content/uploads/2020/04/Berlin_cappuccino_2_Melanie-Bo%CC%88hme.-32-1024x683.jpg"
        alt="Café Express" 
        class="img-fluid rounded shadow"
        style="max-height: 350px; width: 100%; object-fit: cover;"
      >
    </div>

    <!-- MENSAJE DE BIENVENIDA -->
    <h1 class="display-5 fw-bold mb-3">
      ☕ Bienvenido a <span class="text-warning">Café Express</span>
    </h1>
    <p class="lead text-muted mb-4">
      ¿En qué podemos ayudarte hoy?
    </p>

    <!-- TARJETAS DE ACCESO RÁPIDO -->
   <div class="row justify-content-center align-items-center g-10 mt-8" style="max-width: 600px; margin: 0 auto;">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-3 text-center">
          <div class="mb-3">
            <i class="bi bi-cup-hot-fill text-warning" style="font-size: 2.5rem;"></i>
          </div>
          <h5 class="fw-bold">Nuestros Productos</h5>
          <p class="text-muted small">Explora bebidas y alimentos disponibles en el menú.</p>
          <router-link to="/dashboard/productos" class="btn btn-warning btn-sm mt-auto">
            <i class="bi bi-arrow-right-circle me-1"></i> Ver productos
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>