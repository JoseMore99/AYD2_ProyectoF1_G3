const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SolicitudEmpleo = sequelize.define('SolicitudEmpleo', {
  id_solicitud: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    defaultValue: 'pendiente'
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  cv: {
    type: DataTypes.TEXT, // Para almacenar el CV en formato de texto largo
    allowNull: false
  },
  foto: {
    type: DataTypes.BLOB('long'), // Almacenar la foto del solicitante como blob
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING, // Dirección de domicilio
    allowNull: false
  },
  marital_status: {
    type: DataTypes.ENUM('Soltero', 'Casado', 'Divorciado', 'Viudo'),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
    allowNull: false
  }
}, {
  tableName: 'SolicitudEmpleos',
  timestamps: false
});

module.exports = SolicitudEmpleo;
