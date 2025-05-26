const express = require('express')
require('dotenv').config()
const cors = require('cors');
const axios = require('axios');
const { resolve } = require('path');
const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json())

// Middleware para headers personalizados en archivos .js
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

// Servir archivos estáticos
app.use(express.static(resolve(__dirname, 'dist')));

// Manejar todas las rutas para SPA
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
    console.log(`Servidor corriendo`)
})