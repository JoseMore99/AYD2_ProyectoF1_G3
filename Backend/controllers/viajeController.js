const { Op } = require('sequelize'); 
const User = require('../models/User');
const Viaje = require('../models/Viaje');
const Tarifa = require('../models/Tarifa');
const Direccion = require('../models/Direccion');

// Crear un nuevo viaje
const createViaje = async (req, res) => {
  try {
    const { email_usuario, punto_partida, punto_llegada } = req.body;

    const usuario = await User.findOne({ where: { correo: email_usuario } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const tarifa = await Tarifa.findOne({ where: { punto_partida, punto_llegada } });
    if (!tarifa) {
      return res.status(404).json({ message: 'Tarifa no encontrada para estos puntos' });
    }

    const nuevoViaje = await Viaje.create({
      id_usuario: usuario.id,
      id_conductor: null, 
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

  const estadosValidos = ['pendiente', 'en curso', 'finalizado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido' });
  }

  try {
    const viaje = await Viaje.findByPk(id_viaje);
    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

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

// Obtener viajes activos (pendientes)
const getViajesActivos = async (req, res) => {
  try {
    const viajesPendientes = await Viaje.findAll({
      where: { estado: 'pendiente' },
      include: [
        { model: User, as: 'usuario', attributes: ['nombre_completo', 'correo', 'numero_telefono'] },
        { model: Tarifa, as: 'tarifa', attributes: ['monto'] },
        { model: Direccion, as: 'direccionPartida', attributes: ['descripcion'] }, // Asegúrate de que 'descripcion' sea el campo correcto en 'Direcciones'
        { model: Direccion, as: 'direccionLlegada', attributes: ['descripcion'] }
      ]
    });

    if (viajesPendientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron viajes activos' });
    }

    res.json({ trips: viajesPendientes });
  } catch (error) {
    console.error('Error al obtener los viajes activos:', error);
    res.status(500).json({ message: 'Error al obtener los viajes activos' });
  }
};



// Aceptar un viaje
const aceptarViaje = async (req, res) => {
  const { id_viaje } = req.params;
  const conductorId = req.user.id; 

  try {
    const viaje = await Viaje.findOne({ where: { id_viaje } });

    if (!viaje) {
      return res.status(404).json({ success: false, message: 'Viaje no encontrado' });
    }

    if (viaje.estado !== 'pendiente') {
      return res.status(400).json({ success: false, message: 'El viaje ya ha sido aceptado o está en curso' });
    }

    viaje.id_conductor = conductorId;
    viaje.estado = 'en curso';
    await viaje.save();

    res.json({ success: true, message: 'Viaje aceptado con éxito' });
  } catch (error) {
    console.error('Error al aceptar el viaje:', error);
    res.status(500).json({ success: false, message: 'Error al aceptar el viaje' });
  }
};

// Obtener puntos de partida
const getPuntosPartida = async (req, res) => {
  try {
    const puntosPartida = await Direccion.findAll();  
    res.status(200).json(puntosPartida);
  } catch (error) {
    console.error('Error al obtener puntos de partida:', error);
    res.status(500).json({ message: 'Error al obtener puntos de partida' });
  }
};

// Obtener puntos de llegada
const getPuntosLlegada = async (req, res) => {
  try {
    const { id_partida } = req.params;

    const tarifas = await Tarifa.findAll({
      where: {
        punto_partida: id_partida
      },
      attributes: ['punto_llegada']
    });

    if (tarifas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron destinos para este punto de partida' });
    }

    const puntosLlegadaIds = tarifas.map(tarifa => tarifa.punto_llegada);

    const puntosLlegada = await Direccion.findAll({
      where: {
        id_direccion: puntosLlegadaIds
      }
    });

    res.status(200).json(puntosLlegada);
  } catch (error) {
    console.error('Error al obtener puntos de llegada:', error);
    res.status(500).json({ message: 'Error al obtener puntos de llegada' });
  }
};

// Obtener tarifa
const getTarifa = async (req, res) => {
  try {
    const { id_partida, id_llegada } = req.params;

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
  getViajesActivos,
  aceptarViaje,
  getPuntosPartida,
  getPuntosLlegada,
  getTarifa,
};
