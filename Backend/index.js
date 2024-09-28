const express = require('express');
const cors = require('cors');
const { syncDB } = require('./sync');
const protectedRoutes = require('./routes/protected');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/auth');
const userRoutes = require('./routes/userRoute'); 
const driverRequests = require('./routes/driverRequests');
const userRequests = require('./routes/userRequests'); 
const jobApplications = require('./routes/jobApplications');
const viajeRoutes = require('./routes/viajeRoutes');
const { uploadFile } = require('./config/s3');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de saludo
app.get('/', (req, res) => {
  res.json({ status: "OK" });
});

app.post('/prueba', async (req, res) => {
  const i= req.body.imagen
  const bodyImage = Buffer.from(i, 'base64');
  const s3 =await uploadFile(bodyImage,"imagen","jpg") 
  res.json({ status: "OK" ,imagen:s3});
});

// Rutas de autenticación (login, registro, etc.)
app.use('/api/auth', authRoutes);

// Rutas para crear un nuevo usuario (no protegidas por autenticación)
app.use('/userRoute', userRoutes);

// Ruta para solicitudes de conductores
app.use('/api/driverRequests', driverRequests);

// Ruta para las solicitudes de empleo del usuario
app.use('/user', userRequests);  

// Ruta para las solicitudes de empleo
app.use('/api', jobApplications);

// Rutas para solicitar y actualizar viajes
app.use('/api', viajeRoutes);

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
