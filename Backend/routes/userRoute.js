// userRoute.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Role = require('../models/Role'); // Importa Role correctamente
const UserRole = require('../models/UserRole'); // Asegúrate de importar UserRole
const Reporte = require('../models/Reporte')
const jwt = require('jsonwebtoken');
const Viaje = require('../models/Viaje');
const { ReportarProblema, CancelarViaje, ObtenerInfoUser } = require('../controllers/user.controller');
require('dotenv').config();

const router = express.Router();

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }
  const secretKey = process.env.JWT_SECRET;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token no válido o expirado');
    }
    req.user = decoded;
    next();
  });
}

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

router.post('/reportar-problema', verificarToken, [
  check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
  check('fecha', 'La fecha es obligatoria').isDate()
], ReportarProblema);

router.put('/cancelar-viaje', verificarToken,CancelarViaje);

router.get('/user-info', ObtenerInfoUser);

// Dar de baja a un usuario
router.post('/usuarios/:id/baja', async (req, res) => {
  const userId = req.params.id;
  const { reason } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza el estado del usuario y guarda el motivo de la baja
    user.estado = 'inactivo'; 
    user.motivo_baja = reason; 
    await user.save();

    res.json({ message: 'Usuario dado de baja exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al dar de baja al usuario' });
  }
});

// Ruta para obtener la lista de usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre_completo', 'correo', 'estado', 'numero_telefono', 'fecha_nacimiento'], // Ajusta los atributos según lo que quieras devolver
      include: [{ model: Role, attributes: ['role_name'], through: { attributes: [] } }] // Incluye los roles si es necesario
    });

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
});



module.exports = router;
