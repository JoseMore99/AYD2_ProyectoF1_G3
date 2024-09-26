const express = require('express');
const SolicitudEmpleo = require('../models/SolicitudEmpleo');
const User = require('../models/User');
const Vehiculo = require('../models/Vehiculo');
const UserRole = require('../models/UserRole');  // Importa el modelo UserRole
const { Op } = require('sequelize');

const router = express.Router();

// Endpoint para listar todas las solicitudes de empleo
router.get('/solicitudes', async (req, res) => {
    try {
      // Obtener todas las solicitudes
      const solicitudes = await SolicitudEmpleo.findAll({
        include: [
          {
            model: User, 
            attributes: ['id', 'nombre_completo', 'correo', 'numero_telefono'],
            include: [
              {
                model: Vehiculo,
                attributes: ['marca', 'ano', 'numero_placa', 'foto_vehiculo'],
                required: false // El vehículo puede no estar asociado
              }
            ]
          }
        ],
        where: {
          estado: { [Op.or]: ['pendiente', 'aprobado'] }
        },
        order: [['fecha_solicitud', 'DESC']]
      });
  
      res.json(solicitudes);
    } catch (error) {
      console.error('Error al obtener las solicitudes de empleo:', error.message);
      res.status(500).json({ message: 'Error al obtener las solicitudes de empleo.' });
    }
  });
  
  

// Endpoint para obtener detalles de una solicitud de empleo específica
router.get('/solicitudes/:id', async (req, res) => {
    const solicitudId = req.params.id;
  
    try {
      // Buscar la solicitud por ID e incluir la información del usuario y vehículo
      const solicitud = await SolicitudEmpleo.findOne({
        where: { id_solicitud: solicitudId },
        include: [
          {
            model: User,
            attributes: ['id', 'nombre_completo', 'correo', 'numero_telefono', 'genero', 'fotografia_dpi'],
            include: [
              {
                model: Vehiculo,
                attributes: ['marca', 'ano', 'numero_placa', 'foto_vehiculo'],
                required: false  // El vehículo puede no estar asociado
              }
            ]
          }
        ]
      });
  
      if (!solicitud) {
        return res.status(404).json({ message: 'Solicitud no encontrada.' });
      }
  
      res.json(solicitud);
    } catch (error) {
      console.error('Error al obtener la solicitud de empleo:', error.message);
      res.status(500).json({ message: 'Error al obtener la solicitud de empleo.' });
    }
  });
  
  

// Endpoint para aprobar una solicitud de empleo y cambiar el rol del usuario a Conductor
router.post('/solicitudes/:id/aprobar', async (req, res) => {
  const solicitudId = req.params.id;

  try {
    // Buscar la solicitud
    const solicitud = await SolicitudEmpleo.findOne({ where: { id_solicitud: solicitudId } });

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    // Actualizar el estado de la solicitud a "aprobado"
    solicitud.estado = 'aprobado';
    await solicitud.save();

    // Cambiar el rol del usuario a "Conductor"
    const userId = solicitud.id_conductor;  // Asumimos que id_conductor está en la solicitud
    const roleIdConductor = 3;  // Asume que 2 es el ID del rol "Conductor"

    // Primero, elimina el rol actual del usuario en UserRole
    await UserRole.destroy({ where: { user_id: userId } });

    // Luego, asigna el rol "Conductor"
    await UserRole.create({
      user_id: userId,
      role_id: roleIdConductor
    });

    res.json({ message: 'Solicitud aprobada y rol de usuario actualizado a Conductor.' });
  } catch (error) {
    console.error('Error al aprobar la solicitud de empleo:', error.message);
    res.status(500).json({ message: 'Error al aprobar la solicitud de empleo.' });
  }
});

router.post('/solicitudes/:id/rechazar', async (req, res) => {
  const solicitudId = req.params.id;

  try {
    // Buscar la solicitud
    const solicitud = await SolicitudEmpleo.findOne({ where: { id_solicitud: solicitudId } });

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada.' });
    }

    // Actualizar el estado de la solicitud a "rechazado"
    solicitud.estado = 'rechazado';
    await solicitud.save();

    res.json({ message: 'Solicitud rechazada exitosamente.' });
  } catch (error) {
    console.error('Error al rechazar la solicitud de empleo:', error.message);
    res.status(500).json({ message: 'Error al rechazar la solicitud de empleo.' });
  }
});


module.exports = router;
