const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Roles',
  timestamps: false
});

module.exports = Role;