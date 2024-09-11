const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Direccion = sequelize.define('Direccion', {
  id_direccion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.STRING(255)
  },
  zona: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'direcciones',
  timestamps: false
});

module.exports = Direccion;
