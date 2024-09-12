const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
require('dotenv').config();


const router = express.Router();

// Ruta de login
router.post('/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, password } = req.body;
  try {
    // Verifica si el usuario existe
    let user = await User.findOne({ where: { correo } });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario incorrectos' });
    }

    // Verifica el password con bcrypt.compare
    console.log(user.password,"recibo"+ password);
    const isMatch = await bcrypt.compare(password, user.password); // Asegúrate de que la columna de contraseña se llame "password"
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrectos' });
    }

    // Genera el JWT
    const payload = {
      user: {
        id: user.id,
        correo: user.correo
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
