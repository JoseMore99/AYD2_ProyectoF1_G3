const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Puede ser null si no está relacionado con un usuario específico
    references: {
      model: User,
      key: 'id'
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Logs',
  timestamps: false
});


module.exports = Log;
