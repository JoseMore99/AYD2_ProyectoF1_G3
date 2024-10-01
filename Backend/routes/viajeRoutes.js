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
  getViajesEnCurso,
  getViajesUsuario,
  getViajesEnCursoUser,
  getViajesConductor
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

// Obtener viajes en curso
router.get('/viajes/enCursoUser', auth, getViajesEnCursoUser);

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

// Obtener viajes usuario
router.get('/viajes/enCursoUsuario', auth, getViajesUsuario);

// Obtener viajes conductor
router.get('/viajes/enCursoConductor', auth, getViajesConductor);


module.exports = router;
