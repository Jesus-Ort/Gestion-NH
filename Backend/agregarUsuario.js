const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Configuración de interfaz para entrada de datos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usersFilePath = path.join(__dirname, 'users.json');

async function main() {
    try {
    // Obtener datos del usuario
    const email = await question('Email del nuevo usuario: ');
    const password = await question('Contraseña: ');
    
    // Cargar usuarios existentes
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    
    // Verificar si el usuario ya existe
    if (users.some(u => u.email === email)) {
        console.log('Este usuario ya existe');
        return;
    }
    
    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear nuevo usuario
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword
    };
    
    // Guardar usuario
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    
    console.log('Usuario agregado exitosamente!');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
}

// Función auxiliar para preguntas
function question(text) {
    return new Promise(resolve => rl.question(text, resolve));
}

// Ejecutar
main();