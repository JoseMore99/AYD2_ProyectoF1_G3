const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id'
    },
    primaryKey: true
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Permissions',
      key: 'id'
    },
    primaryKey: true
  }
}, {
  tableName: 'RolesPermissions',
  timestamps: false
});

module.exports = RolePermission;
