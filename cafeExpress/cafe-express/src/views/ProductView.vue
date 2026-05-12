<template>
  <div class="container mt-4">
    
    <div class="card text-bg-dark mb-4">
      <img src="https://espressa.es/wp-content/uploads/2025/03/bebidas-frias-con-cafe.jpg" class="card-img" alt="Banner Bebidas" />
      <div class="card-img-overlay d-flex flex-column justify-content-center">
        <h5 class="card-title fs-2">Zona de Bebidas</h5>
        <p class="card-text">Bebidas Disponibles en el negocio</p>
      </div>
    </div>

    <div class="row mb-5">
      <div 
        class="col-md-4 mb-4" 
        v-for="item in listaBebidas" 
        :key="item.id"
      >
        <ProductCardComponent :producto="item" />
      </div>
    </div>

    <div class="card text-bg-dark mb-4">
      <img src="https://www.shutterstock.com/image-photo/delicious-breakfast-served-on-wooden-600nw-2593272873.jpg" class="card-img" alt="Banner Alimentos" />
      <div class="card-img-overlay d-flex flex-column justify-content-center">
        <h5 class="card-title fs-2">Zona de Alimentos</h5>
        <p class="card-text">Comida deliciosa para acompañar</p>
      </div>
    </div>

    <div class="row">
      <div 
        class="col-md-4 mb-4" 
        v-for="item in listaAlimentos" 
        :key="item.id"
      >
        <ProductCardComponent :producto="item" />
      </div>
    </div>

  </div>
</template>

<script>
// Usamos @ para que Vue encuentre la carpeta components y assets desde la raíz src
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import datos from '@/data/products.json';

export default {
  name: 'ProductView',
  components: { 
    ProductCardComponent 
  },
  data() {
    return {
      // Estos filtros solo funcionarán si en tu JSON existe la propiedad "categoria"
      listaBebidas: datos.filter(p => p.categoria === 'bebida'),
      listaAlimentos: datos.filter(p => p.categoria === 'alimento')
    }
  }
}
</script>