const jwt = require('jsonwebtoken');

// Middleware de autenticación para verificar el token 
module.exports = (req, res, next) => {
    try {
        // Extrae el token del header
        const token = req.headers.authorization.split(' ')[1];
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adjunta los datos del usuario decodificado a la solicitud
        req.userData = decoded;
        // Llama a la siguiente función
        next();
    } catch (error) {
        // Si hay un error (token inválido o expirado), responde con un error 401
        return res.status(401).json({ message: 'Autenticación fallida' });
    }
};