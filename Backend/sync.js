const sequelize = require('./config/database');
const User = require('./models/User');
const Role = require('./models/Role');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');
const UserRole = require('./models/UserRole');
const Vehiculo = require('./models/Vehiculo');
const Direccion = require('./models/Direccion');
const Tarifa = require('./models/Tarifa');
const Calificacion = require('./models/Calificacion');
const MetodoPago = require('./models/MetodoPago');
const Pago = require('./models/Pago');
const Reporte = require('./models/Reporte');
const SolicitudEmpleo = require('./models/SolicitudEmpleo');
const Viaje = require('./models/Viaje'); 

// Definir asociaciones entre modelos
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' });

User.hasMany(Vehiculo, { foreignKey: 'id_conductor', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Vehiculo.belongsTo(User, { foreignKey: 'id_conductor' });

Tarifa.belongsTo(Direccion, {
  foreignKey: 'punto_partida',
  as: 'PuntoPartida',
  constraints: true,
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
  foreignKeyConstraintName: 'Tarifas_fk_punto_partida'
});

Tarifa.belongsTo(Direccion, {
  foreignKey: 'punto_llegada',
  as: 'PuntoLlegada', 
  constraints: true,
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
  foreignKeyConstraintName: 'Tarifas_fk_punto_llegada'
});

User.hasMany(Calificacion, { foreignKey: 'id_usuario' });
User.hasMany(Calificacion, { foreignKey: 'id_conductor' });
Calificacion.belongsTo(User, { foreignKey: 'id_usuario' });
Calificacion.belongsTo(User, { foreignKey: 'id_conductor' });
Calificacion.belongsTo(Viaje, { foreignKey: 'id_viaje' });

User.hasMany(MetodoPago, { foreignKey: 'id_usuario' });
MetodoPago.belongsTo(User, { foreignKey: 'id_usuario' });

User.hasMany(Pago, { foreignKey: 'id_conductor' });
Pago.belongsTo(User, { foreignKey: 'id_conductor' });
Pago.belongsTo(Viaje, { foreignKey: 'id_viaje' });

User.hasMany(Reporte, { foreignKey: 'id_usuario' });
User.hasMany(Reporte, { foreignKey: 'id_conductor' });
Reporte.belongsTo(User, { foreignKey: 'id_usuario' });
Reporte.belongsTo(User, { foreignKey: 'id_conductor' });

User.hasMany(SolicitudEmpleo, { foreignKey: 'id_conductor' });
SolicitudEmpleo.belongsTo(User, { foreignKey: 'id_conductor' });

// Sincronizar base de datos
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Otras opciones: { force: true } si necesitas recrear la base de datos
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('Error sincronizando la base de datos:', error);
    throw error;
  }
};

module.exports = { syncDB };
