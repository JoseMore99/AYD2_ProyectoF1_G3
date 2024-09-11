// models/Reporte.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const Reporte = sequelize.define('Reporte', {
    id_reporte: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_reportante: {
        type: DataTypes.INTEGER,
        allowNull: false, // Columna que no permite valores NULL
        references: {
            model: 'Users', // Nombre del modelo en Sequelize
            key: 'id', // Clave primaria en la tabla Users
        },
        onDelete: 'CASCADE', // Acción a tomar si el usuario reportante se elimina
        onUpdate: 'CASCADE', // Acción a tomar si el ID del usuario reportante se actualiza
    },
    id_reporteado: {
        type: DataTypes.INTEGER,
        allowNull: false, // Columna que no permite valores NULL
        references: {
            model: 'Users', // Nombre del modelo en Sequelize
            key: 'id', // Clave primaria en la tabla Users
        },
        onDelete: 'CASCADE', // Acción a tomar si el usuario reportado se elimina
        onUpdate: 'CASCADE', // Acción a tomar si el ID del usuario reportado se actualiza
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false, // Columna que no permite valores NULL
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Valor por defecto de la columna
    },
    tipo: {
        type: DataTypes.ENUM('incidente', 'queja', 'otro'),
        allowNull: false, // Columna que no permite valores NULL
    },
}, {
    tableName: 'Reportes',
    timestamps: false, // Si no estás usando timestamps automáticos
});

module.exports = Reporte;
