<template>
  <div class="login-page d-flex align-items-center bg-light" style="min-height: 100vh;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5 col-lg-4">
          
          <div class="card shadow-lg border-0 card-custom-border" 
               style="border-radius: 25px; background-color: #FFF9F2;">
            
            <div class="corner-decoration top-left"></div>
            <div class="corner-decoration top-right"></div>
            <div class="corner-decoration bottom-left"></div>
            <div class="corner-decoration bottom-right"></div>

            <div class="card-body p-5 text-center" style="position: relative; z-index: 1;">
              
              <div class="mb-4">
                <span style="font-size: 3.5rem;">☕</span>
                <h2 class="fw-bold mt-2" style="color: #4b3621;">Café Express</h2>
                <p class="fst-italic small" style="color: #8D6E63;">"Una taza de energía y un aroma de éxito"</p>
                <hr class="mx-4" style="color: #6F4E37; opacity: 0.2;">
              </div>

              <div v-if="error" class="alert alert-danger py-2 mb-3 border-0 shadow-sm" style="font-size: 0.85rem;">
                Usuario o clave incorrectos
              </div>

              <form @submit.prevent="handleLogin">
                <div class="form-floating mb-3">
                  <input v-model="form.username" type="text" class="form-control border-0 shadow-sm" id="userInput" placeholder="Usuario" required>
                  <label for="userInput">Usuario</label>
                </div>
                
                <div class="form-floating mb-4">
                  <input v-model="form.password" type="password" class="form-control border-0 shadow-sm" id="passInput" placeholder="Contraseña" required>
                  <label for="passInput">Contraseña</label>
                </div>

                <button type="submit" class="btn-cafe w-100 py-3 fw-bold text-white shadow">
                  Ingresar
                </button>
              </form>

            </div>
          </div>
          
          <p class="text-center mt-4 text-muted small">UFPSO 2026 • Café Express</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usuariosData from '../data/usuarios.json'

const router = useRouter()
const error = ref(false)
const form = ref({ username: '', password: '' })

const handleLogin = () => {
  const userFound = usuariosData.find(u => u.user === form.value.username && u.pass === form.value.password)
  if (userFound) {
    error.value = false
    // localStorage.setItem('usuario', JSON.stringify(userFound))
    router.push('/dashboard')
  } else {
    error.value = true
    form.value.password = ''
  }
}
</script>

<style scoped>
/* Marco interno de la tarjeta */
.card-custom-border {
  position: relative;
  border: 8px double #D2B48C !important; /* Borde doble estilo clásico */
  padding: 5px;
}

/* Estilo para los adornos de las esquinas */
.corner-decoration {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid #6F4E37;
  z-index: 0;
  opacity: 0.3;
}

.top-left { top: 15px; left: 15px; border-right: none; border-bottom: none; border-radius: 10px 0 0 0; }
.top-right { top: 15px; right: 15px; border-left: none; border-bottom: none; border-radius: 0 10px 0 0; }
.bottom-left { bottom: 15px; left: 15px; border-right: none; border-top: none; border-radius: 0 0 0 10px; }
.bottom-right { bottom: 15px; right: 15px; border-left: none; border-top: none; border-radius: 0 0 10px 0; }

/* Botón con efecto */
.btn-cafe {
  background-color: #6F4E37;
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.btn-cafe:hover {
  background-color: #4b3621;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.3) !important;
}

.form-control:focus {
  border: 1px solid #D2B48C !important;
  box-shadow: 0 0 0 0.25rem rgba(210, 180, 140, 0.25) !important;
}
</style>