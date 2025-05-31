<template>
  <div class="container mx-auto px-4 py-8">
    
    <!-- Contenedor del formulario -->
    <div class="max-w-2xl mx-auto">
      <!-- Mensaje si no está autenticado -->
      <div v-if="!isAuthenticated" class="bg-medic-green-700/40 p-6 rounded-lg border-2 border-medic-green-400 text-medic-white-500 text-center">
        <p class="mb-4">Debes iniciar sesión para acceder al formulario</p>
        <button @click="goToLogin" class="bg-medic-green-700 px-4 py-2 rounded hover:bg-medic-green-600">
          Ir a inicio de sesión
        </button>
      </div>
      
      <!-- Componente de formulario cuando está autenticado -->
      <VaccineForm v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VaccineForm from '@/components/FormularioComponent.vue';

const router = useRouter();
const isAuthenticated = ref(false);

// Verificar autenticación al cargar el componente
onMounted(() => {
  checkAuth();
});

// Función para verificar autenticación
const checkAuth = () => {
  const token = localStorage.getItem('authToken');
  isAuthenticated.value = !!token;
};

// Cerrar sesión
const logout = () => {
  localStorage.removeItem('authToken');
  isAuthenticated.value = false;
};

// Ir a la página de login
const goToLogin = () => {
  router.push('/login');
};
</script>