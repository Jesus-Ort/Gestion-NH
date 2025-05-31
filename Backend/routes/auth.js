const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// Agregar usuario (con clave maestra)
router.post('/agregar-usuario', async (req, res) => {
    const { email, password, masterKey } = req.body;

    if (masterKey !== process.env.MASTER_KEY) {
        return res.status(403).json({ error: 'Clave maestra inválida' });
    }

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));

    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ success: true, message: `Usuario ${email} creado` });
});

module.exports = router;