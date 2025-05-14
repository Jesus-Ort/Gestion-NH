const express = require('express')
const cors = require('cors');
const axios = require('axios');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Hola desde el backend!' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})