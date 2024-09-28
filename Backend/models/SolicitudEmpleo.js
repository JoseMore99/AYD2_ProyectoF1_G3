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
    type: DataTypes.STRING, // Guardar la URL del CV en formato texto
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING, // Guardar la URL de la foto como texto
    allowNull: false
  },
  vehiclePhoto: {
    type: DataTypes.STRING, // Guardar la URL de la foto del vehículo como texto
    allowNull: true // Este campo es opcional
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