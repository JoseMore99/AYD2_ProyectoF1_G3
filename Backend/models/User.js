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
    allowNull: false
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numero_telefono: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  genero: {
    type: DataTypes.ENUM('M', 'F', 'Otro'),
    allowNull: false
  },
  fotografia_dpi: {
    type: DataTypes.BLOB('long')
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
});

// Método para crear un nuevo usuario
User.createUser = async function(correo, nombre_completo, numero_telefono, fecha_nacimiento, genero, password) {
  try {
    // Verifica si el usuario ya existe
    let user = await this.findOne({ where: { correo } });
    if (user) {
      throw new Error('Usuario ya existe');
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario
    user = await this.create({
      correo,
      nombre_completo,
      numero_telefono,
      fecha_nacimiento,
      genero,
      password: hashedPassword
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Método para encriptar la contraseña antes de guardar el usuario
User.beforeSave(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;