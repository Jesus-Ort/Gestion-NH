const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

router.use(auth); // Proteger todas las rutas de este router

router.post('/submit', async (req, res) => {
    // url de Google Apps Script para enviar datos a Google Sheets
    const apiSubmitUrl = process.env.GOOGLE_SCRIPT_URL; ; 
    try {
    // enviar datos a Google Sheets
    const response = await axios.post(
        `${apiSubmitUrl}`,
        req.body
    );
    // si la respuesta es exitosa, enviar una respuesta al cliente
    res.json({ success: true, data: response.data });
    // si hay un error, enviar un mensaje de error
    } catch (error) {
        console.error('Error al enviar a Google Sheets:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

module.exports = router;