// userRoute.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Role = require('../models/Role'); // Importa Role correctamente
const UserRole = require('../models/UserRole'); // Asegúrate de importar UserRole

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/create-user', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('nombre_completo', 'El nombre completo es obligatorio').not().isEmpty(),
  check('numero_telefono', 'El número de teléfono es obligatorio').not().isEmpty(),
  check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').isDate(),
  check('genero', 'El género es obligatorio').isIn(['M', 'F', 'Otro']),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, nombre_completo, numero_telefono, fecha_nacimiento, genero, password } = req.body;

  try {
    // Crea el nuevo usuario
    const user = await User.createUser(correo, nombre_completo, numero_telefono, fecha_nacimiento, genero, password);

    // Asigna el rol "Usuario" por defecto
    const role = await Role.findOne({ where: { role_name: 'Usuario' } });
    if (!role) {
      return res.status(500).send('Rol "Usuario" no encontrado');
    }

    await UserRole.create({ user_id: user.id, role_id: role.id });

    // Envía la respuesta solo después de todo el proceso
    res.status(201).json({ msg: 'Usuario creado exitosamente', user });

  } catch (error) {
    console.error(error.message);
    // Envía una respuesta solo si no se ha enviado ya una
    if (!res.headersSent) {
      res.status(500).send('Error al crear el usuario');
    }
  }
});

module.exports = router;
