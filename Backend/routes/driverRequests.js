const express = require('express');
const multer = require('multer');
const SolicitudEmpleo = require('../models/SolicitudEmpleo');
const User = require('../models/User');
const Vehiculo = require('../models/Vehiculo');

const router = express.Router();

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

// Función para validar los campos obligatorios
const validateFields = (fields, files) => {
  const requiredFields = ['fullName', 'phoneNumber', 'age', 'dpi', 'email', 'gender', 'maritalStatus', 'address', 'vehicleBrand', 'vehicleYear', 'licensePlate'];
  const missingFields = requiredFields.filter(field => !fields[field] || (field.includes('Photo') && !files[field.toLowerCase()]));
  
  return missingFields;
};

router.post('/', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'vehiclePhoto', maxCount: 1 },
]), async (req, res) => {
  const { fullName, phoneNumber, age, dpi, email, gender, maritalStatus, address, vehicleBrand, vehicleYear, licensePlate } = req.body;

  console.log(req.body);
  console.log(req.files);

  // Validar campos obligatorios
  const missingFields = validateFields(req.body, req.files);
  if (missingFields.length) {
    return res.status(400).json({ message: `Los siguientes campos son obligatorios: ${missingFields.join(', ')}` });
  }

  try {
    // Buscar el usuario por correo
    const userfind = await User.findOne({ where: { correo: email } });
    if (!userfind) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const existingVehicle = await Vehiculo.findOne({ where: { numero_placa: licensePlate } });
    if (existingVehicle) {
      return res.status(400).json({ message: 'El vehículo con esta placa ya está registrado.' });
    }

    // Crear el vehículo
    let newVehicle;
    try {
      newVehicle = await Vehiculo.create({
        marca: vehicleBrand,
        ano: vehicleYear,
        numero_placa: licensePlate,
        foto_vehiculo: req.files['vehiclePhoto'] ? req.files['vehiclePhoto'][0]?.path : null,
        id_conductor: userfind.id // Asignar el ID del conductor basado en el usuario encontrado
      });
    } catch (error) {
      console.error('Error al crear el vehículo:', error.message, error.stack);
      return res.status(500).json({ message: 'Error al crear el vehículo.', error: error.message });
    }

    // Crear la solicitud de empleo
    let newRequest;
    try {
      newRequest = await SolicitudEmpleo.create({
        cv: req.files['cv'][0]?.path,
        foto: req.files['photo'][0]?.path,
        vehiclePhoto: req.files['vehiclePhoto'] ? req.files['vehiclePhoto'][0]?.path : null, // Guardar este archivo solo si existe
        estado: 'pendiente',
        fecha_solicitud: new Date(),
        gender,
        direccion: address,
        id_conductor: userfind.id,
        marital_status: maritalStatus,
        nombre_completo: fullName,
        numero_telefono: phoneNumber,
        edad: age,
      });
    } catch (error) {
      console.error('Error al crear la solicitud de empleo:', error.message, error.stack);
      return res.status(500).json({ message: 'Error al crear la solicitud de empleo.', error: error.message });
    }

    // Respuesta de éxito
    res.status(201).json({ message: 'Solicitud recibida exitosamente.', request: newRequest });
  } catch (error) {
    console.error('Error general al procesar la solicitud:', error.message, error.stack);
    res.status(500).json({ message: 'Error general al procesar la solicitud.', error: error.message });
  }
});

module.exports = router;
