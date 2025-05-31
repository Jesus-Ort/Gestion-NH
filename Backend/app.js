const express = require('express')
require('dotenv').config()
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json())

// // Middleware para headers personalizados en archivos .js
// app.use((req, res, next) => {
//     if (req.path.endsWith('.js')) {
//         res.setHeader('Content-Type', 'application/javascript');
//     }
//     next();
// });

// // Servir archivos estáticos
// app.use(express.static(resolve(__dirname, 'dist')));

// // Manejar todas las rutas para SPA
// app.get(/^\/(?!api).*/, (req, res) => {
//     res.sendFile(resolve(__dirname, 'dist', 'index.html'));
// });

// Crear users.json si no existe
const usersFilePath = path.join(__dirname, 'users.json');
if (!fs.existsSync(usersFilePath)) {
    const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(defaultAdminPassword, salt);
    
    const defaultUser = {
        id: 1,
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: hashedPassword
    };

    fs.writeFileSync(usersFilePath, JSON.stringify([defaultUser]));
    console.log('Archivo users.json creado con usuario admin por defecto');
}

// Rutas
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Proteger acceso al archivo users.json
app.use('/users.json', (req, res) => {
    res.status(403).send('Acceso prohibido');
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Servidor corriendo`)
})