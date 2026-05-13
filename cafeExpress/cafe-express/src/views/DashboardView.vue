<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue';

import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <NavbarComponent />

    <div class="container py-4 flex-grow-1">
      <main class="bg-white p-4 shadow-sm rounded">
        <router-view></router-view>
      </main>
    </div>

    <FooterComponent />
  </div>
</template>
