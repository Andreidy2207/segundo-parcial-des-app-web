<template>
  <div class="card h-100 shadow-sm">
    <img 
      :src="producto.imagen" 
      class="card-img-top img-fija" 
      :alt="producto.nombre"
    >
    <div class="card-body d-flex flex-column">
      <span class="badge bg-secondary mb-2 align-self-start text-capitalize">
        {{ producto.categoria }}
      </span>
      <h5 class="card-title">{{ producto.nombre }}</h5>
      <p class="card-text text-muted flex-grow-1">{{ producto.descripcion }}</p>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <span class="badge bg-success fs-6">${{ Number(producto.precio).toLocaleString('es-CO') }}</span>
        <small class="text-body-secondary">{{ producto.estrellas }}</small>
      </div>
    </div>
    <div class="card-footer d-flex gap-2">
      <button class="btn btn-outline-warning btn-sm flex-fill" @click="$emit('editar', producto)">
        <i class="bi bi-pencil-fill"></i> Editar
      </button>
      <button class="btn btn-outline-danger btn-sm flex-fill" @click="$emit('eliminar', producto.id)">
        <i class="bi bi-trash-fill"></i> Eliminar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    producto: Object
  },
  emits: ['editar', 'eliminar']
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}
.img-fija {
  height: 200px;
  object-fit: cover;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
</style>