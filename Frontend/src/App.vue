<template>
  <div class="min-h-screen bg-medic-green-900 text-medic-white-500">
    <!-- Barra de navegación opcional -->
    <header v-if="showHeader" class="bg-medic-green-800/80 shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-center items-center">
        <button 
          v-if="isAuthenticated"
          @click="logout"
          class="bg-medic-red-700 rounded-md p-2 m-2 text-medic-red-200 hover:scale-110 transition-all flex items-center cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </header>

    <!-- Contenedor principal de vistas -->
    <main class="container mx-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Pie de página opcional -->
    <footer v-if="showFooter" class="bg-medic-green-800/80 py-4 mt-auto">
      <div class="container mx-auto px-4 text-center text-sm">
        <p>Sistema de Gestión de Vacunas Negra Hipolita</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isAuthenticated = ref(false);

// Determinar si mostrar el encabezado
const showHeader = computed(() => {
  return route.name !== 'login';
});

// Determinar si mostrar el pie de página
const showFooter = computed(() => {
  return route.name !== 'login';
});

// Verificar autenticación al inicio
checkAuth();

// Verificar autenticación cuando cambia la ruta
watch(() => route.path, () => {
  checkAuth();
});

function checkAuth() {
  isAuthenticated.value = !!localStorage.getItem('authToken');
}

function logout() {
  localStorage.removeItem('authToken');
  isAuthenticated.value = false;
  router.push('/login');
}
</script>

<style>
/* Transiciones suaves entre vistas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>