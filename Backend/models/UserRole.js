const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const UserRole = sequelize.define('UserRole', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id'
    },
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = UserRole;
