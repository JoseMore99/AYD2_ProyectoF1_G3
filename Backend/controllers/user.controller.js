// userRoute.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Reporte = require('../models/Reporte')
const jwt = require('jsonwebtoken');
const Viaje = require('../models/Viaje');
const Calificacion = require('../models/Calificacion');
require('dotenv').config();

const router = express.Router();


const ReportarProblema =async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { idReportado, nombreReportado, descripcion, fecha, tipo } = req.body;

  try {
    const reportante = await User.findOne({ where: { correo: req.user.user.correo } });
    if (!reportante) {
      return res.status(500).send('Usuario no encontrado');
    }
    var idConductor = idReportado
    if (idConductor == null) {
      const reportado = await User.findOne({ where: { nombre_completo: nombreReportado } });
      if (!reportado) {
        idConductor = 0
      } else {
        idConductor = reportado.id
      }
    }

    const nuevoReporte = await Reporte.create({
      id_reportante: reportante.id,
      id_reporteado: idConductor,
      descripcion: descripcion,
      fecha: fecha,
      tipo: tipo
    });

    res.status(201).json({ msg: 'Reporte de problema creado exitosamente', nuevoReporte });

  } catch (error) {
    console.error(error.message);
    // Envía una respuesta solo si no se ha enviado ya una
    if (!res.headersSent) {
      res.status(500).send('Error al reportar un problema');
    }
  }
}

const CancelarViaje = async (req, res) => {
  const { idViaje } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.user.user)
  try {
    var viaje = null
    if (idViaje) {
      viaje = await Viaje.findByPk(idViaje);  // Buscar el viaje por su ID
      if (!viaje) {
        return res.status(404).json({ msg: `El viaje con ID ${idViaje} no existe.` });
      }
    } else if (req.user.user.roles[0]=='Usuario') {
      viaje = await Viaje.findOne({
        where: {
          id_usuario: req.user.user.id,
          estado: ['pendiente', 'en curso']
        }
      });
      if (!viaje) {
        return res.status(404).json({ msg: `El viaje con para el usuario con ID ${req.user.user.id} no existe.` });
      }

    } else if (req.user.user.roles[0]=='Conductor') {
      viaje = await Viaje.findOne({
        where: {
          id_conductor: 3,
          estado: ['pendiente', 'en curso']
        }
      });
      if (!viaje) {
        return res.status(404).json({ msg: `El viaje para el conductor con ID ${req.user.user.id} no existe.` });
      }

    }
    if (!viaje) {
      return res.status(404).json({ msg: `El viaje no encont5rado.` });
    }

    viaje.estado = 'cancelado';
    viaje.fecha_hora_fin = new Date();

    await viaje.save();

    res.status(200).json({ msg: `El viaje ha sido cancelado correctamente.`, viaje });
  } catch (error) {
    console.error('Error al cancelar el viaje:', error);
    res.status(500).json({ msg: 'Error al cancelar el viaje.', error: error.message });
  }
}

const ObtenerInfoUser = async (req, res) => {
  const { idUser, emailUser } = req.query;
  try {
    if (idUser == -1) {
      const usuario = await User.findOne(
        {
           where: { correo: emailUser }
       });
      if (!usuario) {
        return res.status(500).send('Usuario no encontrado');
      }
      return res.status(201).json({ msg: 'Usuario encontrado exitosamente', usuario });

    }
    const usuario = await User.findOne({ where: { id: idUser } });
    if (!usuario) {
      return res.status(500).send('Usuario no encontrado');
    }
    return res.status(201).json({ msg: 'Usuario encontrado exitosamente', usuario });
  } catch (error) {
    // Envía una respuesta solo si no se ha enviado ya una
    if (!res.headersSent) {
      console.log(error)
      res.status(500).send('Error al buscar info de usuario');
    }
  }
}

module.exports = {
    ObtenerInfoUser,
    ReportarProblema,
    CancelarViaje
}
