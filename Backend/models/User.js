const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Role = require('./Role');
const Direccion = require('./Direccion');
const Vehiculo = require('./Vehiculo');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numero_telefono: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  genero: {
    type: DataTypes.ENUM('M', 'F', 'Otro'),
    allowNull: false
  },
  fotografia_dpi: {
    type: DataTypes.BLOB('long')
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;