<template>
  <div class="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-lg" style="width: 100%; max-width: 400px;">
      <div class="card-body p-5 text-center">
        <h2 class="fw-bold mb-4 text-uppercase">Café Express</h2>
        
        <form @submit.prevent="handleLogin">
          <div v-if="error" class="alert alert-danger py-2" role="alert">
            {{ error }}
          </div>

          <div class="form-floating mb-3">
            <input v-model="form.username" type="text" class="form-control" id="userInput" placeholder="Usuario" required>
            <label for="userInput">Usuario</label>
          </div>

          <div class="form-floating mb-4">
            <input v-model="form.password" type="password" class="form-control" id="passInput" placeholder="Contraseña" required>
            <label for="passInput">Contraseña</label>
          </div>

          <button class="btn btn-dark w-100 btn-lg" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Importamos el JSON que me pasaste
import usuariosData from '@/data/usuarios.json'; 

const router = useRouter();
const error = ref('');
const form = ref({ username: '', password: '' });

const handleLogin = () => {
  // Ajustado a las propiedades de tu JSON: .user y .pass
  const userFound = usuariosData.find(u => u.user === form.value.username && u.pass === form.value.password);

  if (userFound) {
    // IMPORTANTE: Guardamos con la clave 'usuario' para que el guard del router lo reconozca
    localStorage.setItem('usuario', JSON.stringify(userFound));
    router.push('/dashboard'); 
  } else {
    error.value = 'Usuario o contraseña incorrectos';
  }
};
</script>