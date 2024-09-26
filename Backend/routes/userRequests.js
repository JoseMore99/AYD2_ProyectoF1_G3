const express = require('express');
const SolicitudEmpleo = require('../models/SolicitudEmpleo');
const authenticateUser = require('../middleware/auth');  // Importación corregida

const router = express.Router();

// Endpoint para listar solicitudes de empleo del usuario autenticado
router.get('/solicitudes', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;  // ID del usuario autenticado

    // Buscar todas las solicitudes de empleo asociadas al usuario
    const solicitudes = await SolicitudEmpleo.findAll({
      where: { id_conductor: userId },
      order: [['fecha_solicitud', 'DESC']],  // Ordenar por la fecha más reciente
    });

    if (solicitudes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron solicitudes de empleo.' });
    }

    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de empleo:', error.message);
    res.status(500).json({ message: 'Error al obtener las solicitudes de empleo.' });
  }
});

module.exports = router;
