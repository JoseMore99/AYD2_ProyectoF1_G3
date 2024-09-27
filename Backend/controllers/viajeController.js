const { Op } = require('sequelize'); 
const User = require('../models/User');
const Viaje = require('../models/Viaje');
const Tarifa = require('../models/Tarifa');
const Direccion = require('../models/Direccion');  // Asegúrate de tener el modelo Direccion

// Crear un nuevo viaje
const createViaje = async (req, res) => {
  try {
    const { email_usuario, punto_partida, punto_llegada } = req.body;

    // Buscar el usuario por correo electrónico
    const usuario = await User.findOne({ where: { correo: email_usuario } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Buscar la tarifa entre el punto de partida y punto de llegada
    const tarifa = await Tarifa.findOne({ where: { punto_partida, punto_llegada } });
    if (!tarifa) {
      return res.status(404).json({ message: 'Tarifa no encontrada para estos puntos' });
    }

    // Crear el nuevo viaje con estado "pendiente"
    const nuevoViaje = await Viaje.create({
      id_usuario: usuario.id,
      id_conductor: null,  // En este caso, aún no hay conductor asignado
      id_tarifa: tarifa.id_tarifa,
      punto_partida,
      punto_llegada,
      estado: 'pendiente',
      fecha_hora_inicio: new Date()
    });

    res.status(201).json(nuevoViaje);
  } catch (error) {
    console.error('Error al crear viaje:', error);
    res.status(500).json({ message: 'Error al crear el viaje' });
  }
};

// Actualizar el estado de un viaje
const updateEstadoViaje = async (req, res) => {
  const { id_viaje } = req.params;
  const { estado } = req.body;

  // Verificar que el estado proporcionado es válido
  const estadosValidos = ['pendiente', 'en curso', 'finalizado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  try {
    // Buscar el viaje por su ID
    const viaje = await Viaje.findByPk(id_viaje);
    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    // Actualizar el estado del viaje
    viaje.estado = estado;

    if (estado === 'finalizado') {
      viaje.fecha_hora_fin = new Date();
    }

    await viaje.save();
    res.status(200).json({ message: 'Estado del viaje actualizado', viaje });
  } catch (error) {
    console.error('Error al actualizar el estado del viaje:', error);
    res.status(500).json({ message: 'Error al actualizar el estado del viaje' });
  }
};

// Obtener puntos de partida
const getPuntosPartida = async (req, res) => {
  try {
    const puntosPartida = await Direccion.findAll();  // Cambia según tu modelo de Direcciones
    res.status(200).json(puntosPartida);
  } catch (error) {
    console.error('Error al obtener puntos de partida:', error);
    res.status(500).json({ message: 'Error al obtener puntos de partida' });
  }
};

// Obtener puntos de llegada en función del punto de partida
const getPuntosLlegada = async (req, res) => {
  try {
    const { id_partida } = req.params;

    // Buscar todas las tarifas que tienen el punto de partida seleccionado
    const tarifas = await Tarifa.findAll({
      where: {
        punto_partida: id_partida
      },
      attributes: ['punto_llegada']  // Solo necesitamos los puntos de llegada
    });

    if (tarifas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron destinos para este punto de partida' });
    }

    // Extraer los IDs de los puntos de llegada
    const puntosLlegadaIds = tarifas.map(tarifa => tarifa.punto_llegada);

    // Buscar las direcciones correspondientes a esos puntos de llegada
    const puntosLlegada = await Direccion.findAll({
      where: {
        id_direccion: puntosLlegadaIds  // Buscar las direcciones con esos IDs
      }
    });

    res.status(200).json(puntosLlegada);
  } catch (error) {
    console.error('Error al obtener puntos de llegada:', error);
    res.status(500).json({ message: 'Error al obtener puntos de llegada' });
  }
};


// Obtener tarifa según punto de partida y punto de llegada
const getTarifa = async (req, res) => {
  try {
    const { id_partida, id_llegada } = req.params;

    // Buscar la tarifa entre el punto de partida y el punto de llegada
    const tarifa = await Tarifa.findOne({
      where: {
        punto_partida: id_partida,
        punto_llegada: id_llegada
      }
    });

    if (!tarifa) {
      return res.status(404).json({ message: 'Tarifa no encontrada para estos puntos' });
    }

    res.status(200).json({ monto: tarifa.monto });
  } catch (error) {
    console.error('Error al obtener la tarifa:', error);
    res.status(500).json({ message: 'Error al obtener la tarifa' });
  }
};



module.exports = {
  createViaje,
  updateEstadoViaje,
  getPuntosPartida,
  getPuntosLlegada,
  getTarifa,
};
