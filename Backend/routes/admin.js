const express = require('express');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

// Ruta que solo permite acceso a administradores
router.get('/dashboard', auth, role(['admin']), (req, res) => {
  res.json({ msg: 'Bienvenido al panel de administrador' });
});

module.exports = router;
