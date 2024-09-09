const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
require('dotenv').config();
app.use(cors())

// Ruta de saludo
app.get('/', (req, res) => {
  res.json({status: "OK"});
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});