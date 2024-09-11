const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Tarifa = sequelize.define('Tarifa', {
  id_tarifa: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  punto_partida: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Direcciones',
      key: 'id_direccion'
    },
    allowNull: false
  },
  punto_llegada: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Direcciones',
      key: 'id_direccion'
    },
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Tarifas',
  timestamps: false
});

module.exports = Tarifa;
