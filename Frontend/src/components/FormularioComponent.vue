<template>
    <!-- Formulario para vacunar -->
    <div v-if="isAuthenticated" class="bg-medic-green-700/40 mx-auto p-5 mt-15
    border-2 border-medic-green-400 rounded-md flex flex-col gap-3 w-64 relative">

    <p class="text-medic-white-500 text-3xl">Formulario:</p>

    <!-- Nombre -->
    <div class="flex flex-col gap-1">
        <label for="Nombre" class="text-medic-white-500">Nombre: </label>
        <input v-model="form.nombre" type="text"  name="Nombre" id="Nombre"
        placeholder="Ingrese el nombre" 
        class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
    </div>

    <!-- Apellido -->
    <div class="flex flex-col gap-1">
        <label for="Apellido" class="text-medic-white-500">Apellido: </label>
        <input v-model="form.apellido" type="text"  name="Apellido" id="Apellido"
        placeholder="Ingrese el apellido" 
        class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
    </div>

    <!-- Edad -->
    <div class="flex flex-col gap-1">
        <label for="Edad" class="text-medic-white-500">Edad: </label>
        <input v-model="form.edad" @input="validarEdad" maxlength="2"
        type="text"  name="Edad" id="Edad"
        placeholder="Ingrese la edad" 
        class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        <p v-if="edadError" class="text-medic-red-600 text-sm mt-1" >{{ edadError }}</p>
    </div>

    <!-- Cedula -->
    <div class="flex flex-col gap-1">
        <label for="Cedula" class="text-medic-white-500">Cédula: </label>
        <input v-model="form.cedula" @input="validarCedula" maxlength="8"
        type="text"  name="Cedula" id="Cedula"
        placeholder="Ingrese la cédula" 
        class="border-medic-red-600:cedulaError text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        <p v-if="cedulaError" class="text-medic-red-600 text-sm mt-1" >{{ cedulaError }}</p>
    </div>

    <!-- Vacuna -->
    <div class="flex flex-col gap-1">
        <label for="Vacuna" class="text-medic-white-500">Vacuna: </label>
        <select v-model="form.vacuna" name="Vacuna" id="Vacuna" 
        class="text-medic-white-500 outline-0 appearance-none
        border-b-2 shadow-xl cursor-pointer [&>option]:bg-medic-green-600
        [&>option:checked]:bg-medic-green-700">
            <option value="BCG">BCG</option>
            <option value="Hepatitis B">Hepatitis B</option>
            <option value="Rotavirus">Rotavirus</option>
            <option value="Penta Valente">Penta Valente</option>
            <option value="Polio Inactiva">Polio Inactiva</option>
            <option value="Polio Oral">Polio Oral</option>
            <option value="Polio">Polio</option>
            <option value="Neumococo Conjugada">Neumococo Conjugada</option>
            <option value="Influenza Estacional">Influenza Estacional</option>
            <option value="Fiebre Amarilla">Fiebre Amarilla</option>
            <option value="SRP">SRP</option>
            <option value="SR">SR</option>
            <option value="VPH">VPH</option>
            <option value="Toxoide Tetánico Diftérico">Toxoide Tetánico Diftérico</option>
            <option value="Neumococo Polisacarida">Neumococo Polisacarida</option>
            <option value="Meningocócica B-C">Meningocócica B-C</option>
            <option value="Rabia Humana">Rabia Humana</option>
        </select>
    </div>

    <!-- Area Salud -->
    <div class="flex flex-col gap-1">
        <label for="Salud" class="text-medic-white-500">Area de salud: </label>
        <select v-model="form.areaSalud" name="Salud" id="Salud" 
        class="text-medic-white-500 outline-0 appearance-none border-b-2 shadow-xl cursor-pointer 
        [&>option]:bg-medic-green-600 [&>option:checked]:bg-medic-green-700">
            <option value="Maternidad Dr J.G">Maternidad Dr J.G</option>
            <option value="CPT-La Blanca">CPT - La Blanca</option>
            <option value="CPT-Las Margaritas">CPT - Las Margaritas</option>
            <option value="CPT-24 de Junio">CPT - 24 de Junio</option>
            <option value="CPT-Mata Abdon II">CPT - Mata Abdon II</option>
            <option value="CPT-Ojo de Agua">CPT - Ojo de Agua</option>
            <option value="CPT-Sabana Larga">CPT - Sabana Larga</option>
            <option value="CPT-Las Delicias">CPT - Las Delicias</option>
            <option value="CPT-Guasimo">CPT - Guasimo</option>
            <option value="CPT-Vigia">CPT - Vigia</option>
            <option value="CPT-Brisa del Retoño">CPT - Brisa del Retoño</option>
            <option value="CPT-El Espinal">CPT - El Espinal</option>
            <option value="Base de Misiones 24 de Junio">Base de Misiones 24 de Junio</option>
            <option value="La Fortuna">La Fortuna</option>
        </select>
    </div>
    
    <!-- Boton Enviar -->
    <div class="flex flex-col gap-1">
        <button class="bg-medic-green-700 text-xl
        cursor-pointer hover:scale-110 transition-all
        w-12/12 m-auto text-medic-white-500 py-2 rounded"
        :disabled="loading"
        @click="submitForm">
        <span v-if="!loading">Enviar</span>
        <span v-else>Enviando...</span>
        </button>
    </div>

    <!-- Mensajes de estado -->
    <div v-if="successMessage" class="mt-3 p-2 bg-medic-green-500 text-medic-white-500 rounded text-center">
        {{ successMessage }}
    </div>
    
    <div v-if="errorMessage" class="mt-3 p-2 bg-medic-red-500 text-medic-white-500 rounded text-center">
        {{ errorMessage }}
    </div>

    </div>

    <!-- Si no tiene una sesión iniciada -->
    <div v-else class="bg-medic-green-700/40 mx-auto p-5 mt-10 
    border-2 border-medic-green-400 rounded-md flex flex-col gap-3 w-64 text-medic-white-500 text-center">
        <p>Debes iniciar sesión para acceder al formulario</p>
        <button @click="goToLogin" class="bg-medic-green-700 py-2 rounded hover:bg-medic-green-600">
            Ir a iniciar sesión
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Estado de autenticación
const isAuthenticated = ref(false);

// Estado de carga para el botón
const loading = ref(false);

// Mensajes de éxito y error
const successMessage = ref('');
const errorMessage = ref('');

// Recuperamos los datos
const form = ref({
    nombre: '',
    apellido: '',
    edad: '',
    cedula: '',
    vacuna: '',
    areaSalud: ''
});

// const para mostrar errores
const cedulaError = ref('');
const edadError = ref('');

// Reemplaza con la URL de tu API de envio de formulario (submit)
const apiSubmitUrl = import.meta.env.VITE_API_SUBMIT_URL;

// Verificar autenticación al cargar el componente
onMounted(() => {
    checkAuth();
});

// Función para verificar autenticación
const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    isAuthenticated.value = !!token;
};

// Validar cedula 
const validarCedula = () => {
    const cedula = form.value.cedula
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(cedula)) {
        cedulaError.value = 'Solo se permiten números';
        return false;
    }

    cedulaError.value = '';
    return true;
}

// Validamos la edad
const validarEdad = () => {
    const edad = form.value.edad
    const numericRegex = /^[0-9]*$/;

    if (!numericRegex.test(edad)) {
        edadError.value = 'Solo se permiten números';
        return false;
    }

    edadError.value = '';
    return true;
}

// Funcion para enviar los datos de nuestro formulario
const submitForm = async () => {
  // Reiniciar mensajes
    successMessage.value = '';
    errorMessage.value = '';
    
    // Validar que todos los campos estén completos
    if (!form.value.nombre || !form.value.apellido || !form.value.edad || 
        !form.value.cedula || !form.value.vacuna || !form.value.areaSalud) {
    errorMessage.value = "Por favor complete todos los campos";
    return;
    }

  // Validar edad
    if (!validarEdad()) {
    errorMessage.value = "Por favor ingrese una edad válida";
    return;
    }

  // Validar cédula
    if (!validarCedula()) {
    errorMessage.value = "Por favor ingrese una cédula válida";
    return;
    }

    // Estado de carga en true
    loading.value = true;

    // Enviar datos al backend
    try {

        // Obtenemos el token de autenticación
    const token = localStorage.getItem('authToken');
    
    // Realizamos POST a la API de envío de formulario
    const response = await axios.post(
        `${apiSubmitUrl}`,
        form.value,
        {
        headers: {
            'Content-Type': 'application/json',

            // Agregamos el token de autenticación
            'Authorization': `Bearer ${token}`
            }
        }
    );

    // Si la respuesta es exitosa, mostramos mensaje de éxito
    if (response.data.success) {
        successMessage.value = '¡Datos guardados correctamente!';
      // Resetear formulario después de 1.5 segundos
        setTimeout(() => {
            Object.keys(form.value).forEach(k => form.value[k] = '');
            successMessage.value = '';
        }, 1500);
    }
    // Si hay un error, mostramos mensaje de error
    } catch (error) {
        console.error('Error:', error);
    
    // Manejo de errores 
    if (error.response) {

        // Si el error es 401, redirigir a logout
        if (error.response.status === 401) {
            errorMessage.value = 'Sesión expirada. Por favor inicie sesión nuevamente.';
            setTimeout(logout, 2000);
        } 
        // Si el error es 400, mostrar mensaje específico
        else {
            errorMessage.value = error.response.data.error || 'Error al guardar los datos';
        }
    } 
    // Si no hay respuesta del servidor
    else {
        errorMessage.value = 'Error de conexión con el servidor';
    }
    } 
    // Finalmente, cambiamos el estado de carga a false
    finally {
        loading.value = false;
    }
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

<style scoped>
/* Estilos para el botón deshabilitado */
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}
</style>