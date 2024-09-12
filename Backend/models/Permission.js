const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  permission_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Permissions',
  timestamps: false
});

module.exports = Permission;
