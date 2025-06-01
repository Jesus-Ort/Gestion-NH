const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

// Ruta POST para login /api/auth/login
// Esta ruta permite a los usuarios iniciar sesión con su email y contraseña
// y retorna un token JWT si las credenciales son válidas.
router.post('/login', async (req, res) => {
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    // Leer usuarios desde archivo
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    // Buscar usuario por email
    const user = users.find(u => u.email === email);
    // Si no se encuentra el usuario, retornar error
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Comparar contraseña hasheada
    const validPassword = await bcrypt.compare(password, user.password);
    // Si la contraseña no es válida, retornar error
    if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // si las credenciales son válidas, generar un token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    // Retornar el token al cliente
    res.json({ token });
});

// Ruta POST para agregar un nuevo usuario /api/auth/agregar-usuario
// Esta ruta permite agregar un nuevo usuario al sistema
// Requiere una clave maestra para evitar abusos 
// y valida que el usuario no exista ya.
router.post('/agregar-usuario', async (req, res) => {
    // Extraer email, password y masterKey del cuerpo de la solicitud
    const { email, password, masterKey } = req.body;
    // Validar que la clave maestra sea correcta
    if (masterKey !== process.env.MASTER_KEY) {
        return res.status(403).json({ error: 'Clave maestra inválida' });
    }
    // Validar que email y password no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }
    // Leer usuarios desde archivo
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    // Validar que el email no exista ya
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }
    // Hashear la contraseña antes de guardarla (10 rondas de salt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Crear un nuevo usuario
    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword
    };
    // Agregar el nuevo usuario al array de usuarios
    users.push(newUser);
    // Guardar los usuarios actualizados en el archivo
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    // Retornar una respuesta de éxito
    res.json({ success: true, message: `Usuario ${email} creado` });
});

module.exports = router;