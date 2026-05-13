<template>
  <div class="container mt-4">

    <!-- BARRA DE HERRAMIENTAS -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">
        <i class="bi bi-cup-hot-fill text-warning me-2"></i>Gestión de Productos
      </h2>
      <div class="d-flex gap-2 align-items-center">
        <!-- BUSCADOR -->
        <div class="input-group input-group-sm" style="width: 220px;">
          <span class="input-group-text bg-white">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Buscar producto..."
            v-model="busqueda"
          />
          <button 
            v-if="busqueda" 
            class="btn btn-outline-secondary btn-sm" 
            @click="busqueda = ''"
            title="Limpiar búsqueda"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>

        <!-- Filtro por categoría -->
        <select class="form-select form-select-sm" v-model="filtroCategoria" style="width:auto">
          <option value="">Todas las categorías</option>
          <option value="bebida">Bebidas</option>
          <option value="alimento">Alimentos</option>
        </select>

        <button class="btn btn-warning btn-sm" @click="abrirModalCrear">
          <i class="bi bi-plus-circle-fill me-1"></i> Nuevo Producto
        </button>
      </div>
    </div>

    <!-- ALERTA -->
    <div v-if="alerta.visible" :class="`alert alert-${alerta.tipo} alert-dismissible fade show`" role="alert">
      <i :class="`bi bi-${alerta.tipo === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2`"></i>
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.visible = false"></button>
    </div>

    <!-- MENSAJE SI NO HAY RESULTADOS DE BÚSQUEDA -->
    <div v-if="busqueda && listaBebidas.length === 0 && listaAlimentos.length === 0" class="text-center py-5 text-muted">
      <i class="bi bi-search fs-1"></i>
      <p class="mt-2 fs-5">No se encontraron productos con "<strong>{{ busqueda }}</strong>"</p>
      <button class="btn btn-outline-secondary btn-sm" @click="busqueda = ''">
        <i class="bi bi-x-circle me-1"></i> Limpiar búsqueda
      </button>
    </div>

    <!-- SECCIÓN BEBIDAS -->
    <template v-if="filtroCategoria !== 'alimento' && listaBebidas.length > 0">
      <div class="card text-bg-dark mb-4 section-hover">
        <img src="https://espressa.es/wp-content/uploads/2025/03/bebidas-frias-con-cafe.jpg" class="card-img img-banner" alt="Banner Bebidas" />
        <div class="card-img-overlay d-flex flex-column justify-content-center">
          <h5 class="card-title fs-2">Zona de Bebidas</h5>
          <p class="card-text">Bebidas disponibles en el negocio ({{ listaBebidas.length }})</p>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-md-4 mb-4" v-for="item in listaBebidas" :key="item.id">
          <ProductCardComponent 
            :producto="item" 
            @editar="abrirModalEditar"
            @eliminar="confirmarEliminar"
          />
        </div>
      </div>
    </template>

    <!-- SECCIÓN ALIMENTOS -->
    <template v-if="filtroCategoria !== 'bebida' && listaAlimentos.length > 0">
      <div class="card text-bg-dark mb-4 mt-2 section-hover">
        <img src="https://www.shutterstock.com/image-photo/delicious-breakfast-served-on-wooden-600nw-2593272873.jpg" class="card-img img-banner" alt="Banner Alimentos" />
        <div class="card-img-overlay d-flex flex-column justify-content-center">
          <h5 class="card-title fs-2">Zona de Alimentos</h5>
          <p class="card-text">Comida deliciosa para acompañar ({{ listaAlimentos.length }})</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in listaAlimentos" :key="item.id">
          <ProductCardComponent 
            :producto="item" 
            @editar="abrirModalEditar"
            @eliminar="confirmarEliminar"
          />
        </div>
      </div>
    </template>

    <!-- ===================== MODAL CREAR / EDITAR ===================== -->
    <div class="modal fade" id="modalProducto" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-warning bg-opacity-10">
            <h5 class="modal-title">
              <i :class="`bi bi-${modoEdicion ? 'pencil-square' : 'plus-circle'} me-2`"></i>
              {{ modoEdicion ? 'Editar Producto' : 'Nuevo Producto' }}
            </h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Nombre <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="form.nombre" :class="{ 'is-invalid': errores.nombre }" />
                <div class="invalid-feedback">{{ errores.nombre }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Precio (COP) <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" v-model="form.precio" :class="{ 'is-invalid': errores.precio }" min="0" />
                  <div class="invalid-feedback">{{ errores.precio }}</div>
                </div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Categoría <span class="text-danger">*</span></label>
                <select class="form-select" v-model="form.categoria" :class="{ 'is-invalid': errores.categoria }">
                  <option value="">Seleccionar...</option>
                  <option value="bebida">Bebida</option>
                  <option value="alimento">Alimento</option>
                </select>
                <div class="invalid-feedback">{{ errores.categoria }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Estrellas</label>
                <select class="form-select" v-model="form.estrellas">
                  <option value="🌟">⭐ (1)</option>
                  <option value="🌟🌟">⭐⭐ (2)</option>
                  <option value="🌟🌟🌟">⭐⭐⭐ (3)</option>
                  <option value="🌟🌟🌟🌟">⭐⭐⭐⭐ (4)</option>
                  <option value="🌟🌟🌟🌟🌟">⭐⭐⭐⭐⭐ (5)</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">URL de Imagen</label>
                <input type="text" class="form-control" v-model="form.imagen" placeholder="https://..." />
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Descripción <span class="text-danger">*</span></label>
                <textarea class="form-control" v-model="form.descripcion" rows="3" :class="{ 'is-invalid': errores.descripcion }"></textarea>
                <div class="invalid-feedback">{{ errores.descripcion }}</div>
              </div>
              <div class="col-12" v-if="form.imagen">
                <label class="form-label fw-semibold">Vista previa</label>
                <img :src="form.imagen" class="img-thumbnail" style="max-height:150px;object-fit:cover" :alt="form.nombre" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="cerrarModal">
              <i class="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button class="btn btn-warning" @click="guardarProducto">
              <i class="bi bi-floppy-fill me-1"></i> 
              {{ modoEdicion ? 'Guardar cambios' : 'Crear producto' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL CONFIRMAR ELIMINAR ===================== -->
    <div class="modal fade" id="modalEliminar" tabindex="-1" ref="modalEliminarRef">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header bg-danger bg-opacity-10">
            <h5 class="modal-title text-danger">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>Eliminar
            </h5>
            <button type="button" class="btn-close" @click="cerrarModalEliminar"></button>
          </div>
          <div class="modal-body text-center">
            <p>¿Seguro que deseas eliminar <strong>{{ productoAEliminar?.nombre }}</strong>?</p>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" @click="cerrarModalEliminar">Cancelar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarProducto">
              <i class="bi bi-trash-fill me-1"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import datosIniciales from '@/data/products.json';
import { Modal } from 'bootstrap';

const LS_KEY = 'cafeteria_productos';

function cargarDesdeLS() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('No se encontraron datos en localStorage, cargando JSON por defecto.');
  }
  localStorage.setItem(LS_KEY, JSON.stringify(datosIniciales));
  return datosIniciales;
}

function guardarEnLS(lista) {
  localStorage.setItem(LS_KEY, JSON.stringify(lista));
}

const formVacio = () => ({
  id: null,
  nombre: '',
  descripcion: '',
  imagen: '',
  precio: '',
  estrellas: '🌟🌟🌟',
  categoria: ''
});

export default {
  name: 'ProductView',
  components: { ProductCardComponent },
  data() {
    return {
      productos: [],
      filtroCategoria: '',
      busqueda: '',
      form: formVacio(),
      errores: {},
      modoEdicion: false,
      modalInstancia: null,
      modalEliminarInstancia: null,
      productoAEliminar: null,
      alerta: { visible: false, tipo: 'success', mensaje: '' }
    };
  },
  computed: {
    productosFiltrados() {
      if (!this.filtroCategoria) return this.productos;
      return this.productos.filter(p => p.categoria === this.filtroCategoria);
    },
    listaBebidas() {
      return this.productos.filter(p =>
        p.categoria === 'bebida' &&
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
    listaAlimentos() {
      return this.productos.filter(p =>
        p.categoria === 'alimento' &&
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  },
  mounted() {
    this.productos = cargarDesdeLS();
    this.modalInstancia = new Modal(this.$refs.modalRef);
    this.modalEliminarInstancia = new Modal(this.$refs.modalEliminarRef);
  },
  methods: {
    guardarProducto() {
      if (!this.validar()) return;
      if (this.modoEdicion) {
        const idx = this.productos.findIndex(p => p.id === this.form.id);
        if (idx !== -1) this.productos.splice(idx, 1, { ...this.form });
        this.mostrarAlerta('success', `"${this.form.nombre}" actualizado correctamente.`);
      } else {
        const nuevoId = this.productos.length
          ? Math.max(...this.productos.map(p => p.id)) + 1
          : 1;
        this.productos.push({ ...this.form, id: nuevoId });
        this.mostrarAlerta('success', `"${this.form.nombre}" agregado al menú.`);
      }
      guardarEnLS(this.productos);
      this.cerrarModal();
    },

    eliminarProducto() {
      this.productos = this.productos.filter(p => p.id !== this.productoAEliminar.id);
      guardarEnLS(this.productos);
      this.mostrarAlerta('warning', `"${this.productoAEliminar.nombre}" eliminado.`);
      this.cerrarModalEliminar();
    },

    abrirModalCrear() {
      this.modoEdicion = false;
      this.form = formVacio();
      this.errores = {};
      this.modalInstancia.show();
    },
    abrirModalEditar(producto) {
      this.modoEdicion = true;
      this.form = { ...producto };
      this.errores = {};
      this.modalInstancia.show();
    },
    cerrarModal() {
      this.modalInstancia.hide();
    },
    confirmarEliminar(id) {
      this.productoAEliminar = this.productos.find(p => p.id === id);
      this.modalEliminarInstancia.show();
    },
    cerrarModalEliminar() {
      this.modalEliminarInstancia.hide();
      this.productoAEliminar = null;
    },

    validar() {
      const e = {};
      if (!this.form.nombre.trim()) e.nombre = 'El nombre es obligatorio.';
      if (!this.form.descripcion.trim()) e.descripcion = 'La descripción es obligatoria.';
      if (!this.form.categoria) e.categoria = 'Selecciona una categoría.';
      if (!this.form.precio || isNaN(this.form.precio) || Number(this.form.precio) < 0)
        e.precio = 'Ingresa un precio válido.';
      this.errores = e;
      return Object.keys(e).length === 0;
    },

    mostrarAlerta(tipo, mensaje) {
      this.alerta = { visible: true, tipo, mensaje };
      setTimeout(() => { this.alerta.visible = false; }, 4000);
    }
  }
};
</script>

<style scoped>
.section-hover {
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.section-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}
.img-banner {
  height: 350px;
  object-fit: cover;
  width: 100%;
  filter: brightness(60%);
  transition: transform 0.5s ease;
}
.section-hover:hover .img-banner {
  transform: scale(1.05);
}
.card-img-overlay {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
</style>