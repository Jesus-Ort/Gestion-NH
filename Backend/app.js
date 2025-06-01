const express = require('express')
require('dotenv').config()
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

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

// Importar rutas
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Proteger acceso al archivo users.json
app.use('/users.json', (req, res) => {
    res.status(403).send('Acceso prohibido');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
})