const express = require('express');
const router = express.Router();
const { createViaje, updateEstadoViaje, getPuntosPartida, getPuntosLlegada, getTarifa } = require('../controllers/viajeController');

// Crear un nuevo viaje
router.post('/viajes', createViaje);

// Actualizar el estado de un viaje
router.put('/viajes/:id_viaje', updateEstadoViaje);

// Obtener puntos de partida
router.get('/direcciones/partida', getPuntosPartida);

// Obtener puntos de llegada según el punto de partida
router.get('/direcciones/llegada/:id_partida', getPuntosLlegada);

// Obtener la tarifa según punto de partida y llegada
router.get('/tarifas/:id_partida/:id_llegada', getTarifa);

module.exports = router;
