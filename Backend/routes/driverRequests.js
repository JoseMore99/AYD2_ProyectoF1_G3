const express = require('express');
const multer = require('multer');
const SolicitudEmpleo = require('../models/SolicitudEmpleo');
const User = require('../models/User');
const Vehiculo = require('../models/Vehiculo');
const { uploadFile } = require('../config/s3'); // Importamos la función de subir archivos a S3

const router = express.Router();

// Configuración de Multer para la carga de archivos en memoria
const storage = multer.memoryStorage(); // Almacenamos los archivos en memoria
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

    // Verificar si el usuario ya tiene una solicitud de empleo pendiente o rechazada
    const existingRequest = await SolicitudEmpleo.findOne({
      where: {
        id_conductor: userfind.id,
        estado: ['pendiente', 'rechazado']
      }
    });

    if (existingRequest && existingRequest.estado === 'pendiente') {
      return res.status(400).json({ message: 'Ya tienes una solicitud pendiente. Por favor espera a que sea revisada.' });
    }

    // Subir los archivos a S3
    const cvUrl = req.files['cv'] ? await uploadFile(req.files['cv'][0].buffer, 'cv', 'pdf') : null;
    const photoUrl = req.files['photo'] ? await uploadFile(req.files['photo'][0].buffer, 'photo', 'jpg') : null;
    const vehiclePhotoUrl = req.files['vehiclePhoto'] ? await uploadFile(req.files['vehiclePhoto'][0].buffer, 'vehiclePhoto', 'jpg') : null;

    // Crear el vehículo
    let newVehicle;
    try {
      newVehicle = await Vehiculo.create({
        marca: vehicleBrand,
        ano: vehicleYear,
        numero_placa: licensePlate,
        foto_vehiculo: vehiclePhotoUrl, // Guardamos la URL del archivo en S3
        id_conductor: userfind.id
      });
    } catch (error) {
      console.error('Error al crear el vehículo:', error.message, error.stack);
      return res.status(500).json({ message: 'Error al crear el vehículo.', error: error.message });
    }

    // Crear la solicitud de empleo
    let newRequest;
    try {
      newRequest = await SolicitudEmpleo.create({
        cv: cvUrl, // Guardamos la URL del archivo en S3
        foto: photoUrl, // Guardamos la URL del archivo en S3
        vehiclePhoto: vehiclePhotoUrl, // Guardamos la URL del archivo en S3
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
