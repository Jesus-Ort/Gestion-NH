const express = require('express')
require('dotenv').config()
const cors = require('cors');
const axios = require('axios');
const app = express()
const port = process.env.PORT

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Hola desde el backend!' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})