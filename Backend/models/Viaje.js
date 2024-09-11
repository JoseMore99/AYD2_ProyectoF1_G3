const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viaje = sequelize.define('Viaje', {
  id_viaje: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  punto_partida: {
    type: DataTypes.INTEGER, // Asumiendo que es una referencia a una dirección
    allowNull: false
  },
  punto_llegada: {
    type: DataTypes.INTEGER, // Asumiendo que es una referencia a una dirección
    allowNull: false
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Finalizado', 'Cancelado'),
    allowNull: false
  },
  id_conductor: {
    type: DataTypes.INTEGER, // Referencia a la tabla de usuarios (conductores)
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER, // Referencia a la tabla de usuarios (clientes)
    allowNull: false
  }
}, {
    tableName: 'Viajes',
  timestamps: false
});

module.exports = Viaje;
