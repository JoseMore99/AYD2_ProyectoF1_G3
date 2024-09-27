const express = require('express');
const router = express.Router();
const { 
  createViaje, 
  updateEstadoViaje, 
  getViajesActivos, 
  aceptarViaje, 
  getPuntosPartida, 
  getPuntosLlegada, 
  getTarifa, 
  finalizarViaje,
  getViajesEnCurso
} = require('../controllers/viajeController');
const auth = require('../middleware/auth');

// Crear un nuevo viaje
router.post('/viajes', createViaje);

// Actualizar el estado de un viaje
router.put('/viajes/:id_viaje', updateEstadoViaje);

// Obtener viajes activos
router.get('/viajes/activos', auth, getViajesActivos);

// Obtener viajes en curso
router.get('/viajes/enCurso', auth, getViajesEnCurso);

// Aceptar un viaje
router.post('/viajes/:id_viaje/accept', auth, aceptarViaje);

// Finalizar un viaje
router.post('/viajes/:id_viaje/finish', auth, finalizarViaje);

// Obtener puntos de partida
router.get('/direcciones/partida', getPuntosPartida);

// Obtener puntos de llegada
router.get('/direcciones/llegada/:id_partida', getPuntosLlegada);

// Obtener la tarifa
router.get('/tarifas/:id_partida/:id_llegada', getTarifa);

module.exports = router;
