const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viaje = sequelize.define('Viaje', {
  id_viaje: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // nombre de la tabla de usuarios
      key: 'id'
    }
  },
  id_conductor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users', // nombre de la tabla de usuarios
      key: 'id'
    }
  },
  id_tarifa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tarifas', // nombre de la tabla de tarifas
      key: 'id_tarifa'
    }
  },
  punto_partida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Direcciones', // nombre de la tabla de direcciones
      key: 'id_direccion'
    }
  },
  punto_llegada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Direcciones', // nombre de la tabla de direcciones
      key: 'id_direccion'
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en curso', 'finalizado','cancelado'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  fecha_hora_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_hora_fin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'Viajes',
  timestamps: false
});

module.exports = Viaje;
