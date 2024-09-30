const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numero_telefono: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  genero: {
    type: DataTypes.ENUM('M', 'F', 'Otro'),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo' // Por defecto los usuarios están activos
  },
  motivo_baja: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fotografia_dpi: {
    type: DataTypes.STRING, // URL de la fotografía del DPI almacenada en S3
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
});

const generateUsername = async (correo) => {
  // Extraer la parte local del correo (antes del @)
  const correoLocal = correo.split('@')[0].toLowerCase();

  // Prefijo 'qnave_'
  let username = `qnave_${correoLocal}`;

  // Verifica si el nombre de usuario ya existe
  let userExists = await User.findOne({ where: { nombre_usuario: username } });

  // Si el nombre de usuario ya existe, agrega un número aleatorio al final
  while (userExists) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
    username = `qnave_${correoLocal}_${randomNumber}`;
    userExists = await User.findOne({ where: { nombre_usuario: username } });
  }

  return username;
};

User.createUser = async function (correo, nombre_completo, numero_telefono, fecha_nacimiento, genero, password) {
  try {
    // Verifica si el correo ya existe
    let user = await this.findOne({ where: { correo } });
    if (user) {
      throw new Error('Usuario ya existe');
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Genera un nombre de usuario único
    const nombre_usuario = await generateUsername(nombre_completo);

    // Crea el nuevo usuario
    user = await this.create({
      correo,
      nombre_completo,
      numero_telefono,
      fecha_nacimiento,
      genero,
      password: hashedPassword,
      nombre_usuario,
      estado: 'activo' // Estado por defecto
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = User;