const express = require('express');
const router = express.Router();
const { 
  createViaje, 
  updateEstadoViaje, 
  getViajesActivos, 
  aceptarViaje, 
  getPuntosPartida, 
  getPuntosLlegada, 
  getTarifa 
} = require('../controllers/viajeController');
const auth = require('../middleware/auth');

// Crear un nuevo viaje
router.post('/viajes', createViaje);

// Actualizar el estado de un viaje
router.put('/viajes/:id_viaje', updateEstadoViaje);

// Obtener viajes activos
router.get('/viajes/activos', auth, getViajesActivos);

// Aceptar un viaje
router.post('/viajes/:id_viaje/accept', auth, aceptarViaje);

// Obtener puntos de partida
router.get('/direcciones/partida', getPuntosPartida);

// Obtener puntos de llegada
router.get('/direcciones/llegada/:id_partida', getPuntosLlegada);

// Obtener la tarifa
router.get('/tarifas/:id_partida/:id_llegada', getTarifa);

module.exports = router;
