const express = require('express');
const cors = require('cors');
const { syncDB } = require('./sync'); // Asegúrate de importar syncDB correctamente

const app = express();

app.use(cors());
app.use(express.json());

// Definir rutas aquí

// Ruta de saludo
app.get('/', (req, res) => {
  res.json({status: "OK"});
});

const startServer = async () => {
  try {
    await syncDB(); // Llama a la función para sincronizar la base de datos
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Failed to sync DB or start server:', error);
  }
};

startServer();
