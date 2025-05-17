<style scoped></style>

<template>
    <!-- Formulario para vacunar -->
    <div class=" bg-medic-green-700/40 mx-auto p-5 mt-10 
    border-2 border-medic-green-400 rounded-md flex flex-col gap-3 w-64 ">

        <p class="text-medic-white-500 text-3xl">Formulario:</p>

        <!-- Nombre -->
        <div class="flex flex-col gap-1">
            <label for="Nombre" class="text-medic-white-500">Nombre: </label>
            <input type="text"  name="Nombre" id="Nombre"
            placeholder="Ingrese el nombre" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        </div>

        <!-- Apellido -->
        <div class="flex flex-col gap-1">
            <label for="Apellido" class="text-medic-white-500">Apellido: </label>
            <input type="text"  name="Apellido" id="Apellido"
            placeholder="Ingrese el apellido" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        </div>

        <!-- Edad -->
        <div class="flex flex-col gap-1">
            <label for="Edad" class="text-medic-white-500">Edad: </label>
            <input type="text"  name="Edad" id="Edad"
            placeholder="Ingrese la edad" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        </div>

        <!-- Cedula -->
        <div class="flex flex-col gap-1">
            <label for="Cedula" class="text-medic-white-500">Cédula: </label>
            <input type="text"  name="Cedula" id="Cedula"
            placeholder="Ingrese la cédula" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl">
        </div>

        <!-- Vacuna -->
        <div class="flex flex-col gap-1">
            <label for="Vacuna" class="text-medic-white-500">Vacuna: </label>
            <input type="text"  name="Vacuna" id="Vacuna"
            placeholder="Ingrese la vacuna" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl ">
        </div>

        <!-- Area Salud -->
        <div class="flex flex-col gap-1">
            <label for="Salud" class="text-medic-white-500">Area de salud: </label>
            <input type="text"  name="Salud" id="Salud"
            placeholder="Ingrese el area de salud" 
            class="text-medic-white-500 outline-0 placeholder:text-medic-white-500 border-b-2 shadow-xl ">
        </div>
    </div>
</template>

<script setup>
</script>