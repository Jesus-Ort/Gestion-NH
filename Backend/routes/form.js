const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

router.use(auth); // Proteger todas las rutas de este router

router.post('/submit', async (req, res) => {
    try {
    // Aquí va tu lógica para enviar a Google Sheets
    // Ejemplo:
    const response = await axios.post(
        'https://script.google.com/macros/s/AKfycbwi4tCZsriO3OyGfW7yKc6HfCp3EOL9tBxr9obIvckioLqszPSqf4_tmh4b0DpOOu-r/exec',
        req.body
    );
    
    res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar a Google Sheets:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

module.exports = router;