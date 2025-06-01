<template>
  <div class="text-medic-white-500 bg-medic-green-700/40 mx-auto p-5 
    border-2 border-medic-green-400 rounded-md flex flex-col gap-3 w-64 relative">
    <h2 class="text-2xl font-bold mb-6 text-center">Sistema de Gestión de Vacunas Negra Hipolita</h2>
    
    <!-- Manejo de errores -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
      {{ error }}
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Email</label>
      <input 
        v-model="email"
        type="email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medic-green-500"
        placeholder="tu@email.com"
      >
    </div>

    <!-- Contraseña -->
    <div class="mb-6">
      <label class="block  text-sm font-medium mb-2">Contraseña</label>
      <input 
        v-model="password"
        type="password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medic-green-500"
        placeholder="••••••••"
      >
    </div>
    
    <!-- Boton de inicio de sesión -->
    <button
      @click="login"
      :disabled="loading"
      class="bg-medic-green-700 text-xl
        cursor-pointer hover:scale-110 transition-all
        w-12/12 m-auto text-medic-white-500 py-2 rounded"
>
      <span v-if="!loading">Ingresar</span>
      <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    // Definimos los datos reactivos del componente,
    // incluyendo email, password, error y loading.
    // Estos datos se utilizarán para manejar el estado del formulario de inicio de sesión.
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  },

  // Para manejar el inicio de sesión, 
  // se utiliza un método que envía una solicitud a la API de autenticación.

  methods: {
    async login() {

      // Validamos que el email y la contraseña no estén vacíos.
      // Si alguno de los campos está vacío, mostramos un mensaje de error.
      if (!this.email || !this.password) {
        this.error = 'Por favor ingresa email y contraseña';
        return;
      }

      // Reseteamos el estado de error y loading le asignamos true antes de hacer la solicitud.
      this.loading = true;
      this.error = '';

      // Reemplaza con la URL de tu API de autenticación
      const apiLoginUrl = import.meta.env.VITE_API_LOGIN_URL;

      // Realizamos la solicitud POST a la API de autenticación con el email y la contraseña.
      try {
        const response = await fetch(`${apiLoginUrl}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await response.json();
        
        // Si la respuesta no es exitosa, lanzamos un error con el mensaje de error de la API.
        if (!response.ok) {
          throw new Error(data.error || 'Error al iniciar sesión');
        }
        
        // Si la autenticación es exitosa, guardamos el token en localStorage
        // y emitimos un evento de éxito para que el componente padre pueda manejarlo.
        localStorage.setItem('authToken', data.token);
        this.$emit('login-success');

        // Si hubo errores en la autenticación, los mostramos.
      } catch (err) {
        this.error = err.message || 'Error de autenticación';
      } finally {
        // Independientemente de si la solicitud fue exitosa o no,
        // cambiamos el estado de loading a false.
        this.loading = false;
      }
    }
  }
};
</script>