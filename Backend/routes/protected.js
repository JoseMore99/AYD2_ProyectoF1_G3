const express = require('express');
const auth = require('../middleware/auth'); // Middleware para verificar JWT
const role = require('../middleware/role'); // Middleware para verificar el rol del usuario

const router = express.Router();

// Ruta que solo permite acceso a usuarios autenticados
router.get('/profile', auth, (req, res) => {
  res.json({
    msg: 'Bienvenido al perfil de usuario',
    user: req.user // Información del usuario extraída del token
  });
});

// Ruta que solo permite acceso a administradores
router.get('/admin', auth, role(['admin']), (req, res) => {
  res.json({
    msg: 'Bienvenido al panel de administrador',
    user: req.user // Información del usuario con rol de administrador
  });
});

// Ruta que permite acceso a conductores
router.get('/driver-dashboard', auth, role(['conductor']), (req, res) => {
  res.json({
    msg: 'Bienvenido al panel del conductor',
    user: req.user // Información del usuario con rol de conductor
  });
});

// Ruta que permite acceso a usuarios regulares
router.get('/user-dashboard', auth, role(['usuario']), (req, res) => {
  res.json({
    msg: 'Bienvenido al panel de usuario',
    user: req.user // Información del usuario con rol de usuario
  });
});

module.exports = router;
