<template>
  <div class="card h-100 shadow-sm">
    <img :src=producto.imagen class="card-img-top" :alt=producto.nombre>
    
    <div class="card-body">
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text text-muted">{{ producto.descripcion }}</p>
      
      <div class="d-flex justify-content-between align-items-center">
        <span class="badge bg-success">${{ producto.precio }}</span>
        <small class="text-body-secondary">{{ producto.estrellas }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Aquí recibimos el objeto 'producto' desde el archivo principal
  props: {
    producto: Object
  }
}
</script>