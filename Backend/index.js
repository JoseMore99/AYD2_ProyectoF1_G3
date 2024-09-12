const express = require('express');
const cors = require('cors');
const { syncDB } = require('./sync');
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/auth');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de saludo
app.get('/', (req, res) => {
  res.json({ status: "OK" });
});

// Rutas de autenticación (login, registro, etc.)
app.use('/api/auth', authRoutes);

// Rutas para crear un nuevo usuario (no protegidas por autenticación)
app.use('/userRoute', userRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/api', verifyToken, protectedRoutes);

const startServer = async () => {
  try {
    await syncDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Failed to sync DB or start server:', error);
  }
};

startServer();
