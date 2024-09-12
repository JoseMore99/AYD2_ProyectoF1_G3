const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Calificacion = sequelize.define('Calificacion', {
  id_calificacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  puntaje: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Calificaciones',
  timestamps: false
});

module.exports = Calificacion;
