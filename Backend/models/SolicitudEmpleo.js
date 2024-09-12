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
  }
}, {
  tableName: 'SolicitudEmpleos',
  timestamps: false
});

module.exports = SolicitudEmpleo;
