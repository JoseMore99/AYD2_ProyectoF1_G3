// models/Vehiculo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define el modelo Vehiculo
const Vehiculo = sequelize.define('Vehiculo', {
  id_vehiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_vehiculo'
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_placa: {
    type: DataTypes.STRING(20),
    allowNull: false,
   // unique: true
  },
  foto_vehiculo: {
    type: DataTypes.STRING, // Guardar la URL de la foto del vehículo como texto
    allowNull: true // Este campo es opcional
  },
  id_conductor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Referencia al nombre de la tabla como cadena
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'Vehiculos',
  timestamps: false
});

module.exports = Vehiculo;
