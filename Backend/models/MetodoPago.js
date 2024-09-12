const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const MetodoPago = sequelize.define('MetodoPago', {
  id_metodo_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numero_tarjeta: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  fecha_expiracion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cvv: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Debito', 'Credito'),
    allowNull: false
  },
  nombre_propietario: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'MetodosPagos',
  timestamps: false
});

module.exports = MetodoPago;
