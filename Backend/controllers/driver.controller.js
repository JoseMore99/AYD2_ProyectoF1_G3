const User = require('../models/User');
const Reporte = require('../models/Reporte')
const { check, validationResult } = require('express-validator');

require('dotenv').config();


const ReportarProblema = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { idReportado, nombreReportado, descripcion, fecha, tipo } = req.body;
  
    try {
      const reportante = await User.findOne({ where: { correo: req.user.user.correo } });
      if (!reportante) {
        return res.status(500).send('Usuario no encontrado');
      }
      var idRep = idReportado
      if (idRep == null) {
        const reportado = await User.findOne({ where: { nombre_completo: nombreReportado } });
        if (!reportado) {
            idRep = 0
        } else {
            idRep = reportado.id
        }
      }
  
      const nuevoReporte = await Reporte.create({
        id_reportante: reportante.id,
        id_reporteado: idRep,
        descripcion: descripcion,
        fecha: fecha,
        tipo: tipo,
        id_conductor: reportante.id,
      });
  
      res.status(201).json({ msg: 'Reporte de problema creado exitosamente', nuevoReporte });
  
    } catch (error) {
      console.error(error.message);
      // Envía una respuesta solo si no se ha enviado ya una
      if (!res.headersSent) {
        res.status(500).send('Error al reportar un problema');
      }
    }

}

module.exports = {
    ReportarProblema
}