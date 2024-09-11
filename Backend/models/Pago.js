// models/Pago.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de ajustar la ruta a tu archivo de configuración de Sequelize

const Pago = sequelize.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_viaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Viajes',
            key: 'id_viaje'
        },
        onDelete: 'SET NULL', // Manejo de eliminación en cascada
    },
    id_conductor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    monto_pago: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado_pago: {
        type: DataTypes.ENUM('pendiente', 'completado'),
        defaultValue: 'pendiente',
    },
    fecha_pago: {
        type: DataTypes.DATE, // Cambiado de TIMESTAMP a DATE
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Pagos',
    timestamps: false, // Si no estás usando timestamps automáticos
});

module.exports = Pago;
