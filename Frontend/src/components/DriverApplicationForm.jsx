import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración

function DriverApplicationForm() {
  const storedEmail = localStorage.getItem('correo');
  const navigate = useNavigate(); // Hook para redirigir

  if (!storedEmail) {
    alert('Debes iniciar sesión para acceder a esta página.');
    navigate('/'); // Redirigir a la ruta /login
  }

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    age: '',
    dpi: '',
    email: storedEmail,
    cv: null,
    photo: null,
    vehiclePhoto: null,
    licensePlate: '',
    vehicleBrand: '',
    vehicleYear: '',
    gender: '',
    maritalStatus: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Para mostrar errores

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Inicia el loader
    setErrorMessage(null); // Reinicia los mensajes de error

    // Validaciones
    const age = parseInt(formData.age, 10);
    const phoneRegex = /^[0-9]{8}$/;
    const dpiRegex = /^[0-9]{13}$/;

    if (age < 18 || age > 90) {
      setErrorMessage('La edad debe estar entre 18 y 90 años.');
      setIsLoading(false);
      return;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      setErrorMessage('El número de teléfono debe contener exactamente 8 dígitos numéricos.');
      setIsLoading(false);
      return;
    }

    if (!dpiRegex.test(formData.dpi)) {
      setErrorMessage('El DPI debe contener exactamente 13 dígitos.');
      setIsLoading(false);
      return;
    }

    if (!formData.cv || !formData.photo || !formData.vehiclePhoto) {
      setErrorMessage('Debes adjuntar tu CV, una fotografía y una foto del vehículo.');
      setIsLoading(false);
      return;
    }

    const currentYear = new Date().getFullYear();
    if (parseInt(formData.vehicleYear) < 1910 || parseInt(formData.vehicleYear) > currentYear) {
      setErrorMessage('Por favor ingresa un año de vehículo válido.');
      setIsLoading(false);
      return;
    }

    // Preparar datos para enviar
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key !== 'email') {  // Omitir agregar el correo aquí
        formDataToSend.append(key, formData[key]);
      }
    }

    // Agregar correo del localStorage
    if (storedEmail) {
      formDataToSend.append('email', storedEmail);
    }

    try {
      console.log([...formDataToSend]); // Verificar los datos a enviar
      // Enviar solicitud al backend usando fetch
      const response = await fetch(`${config.apiUrl}/api/driverRequests`, { // Usa config.apiUrl
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || 'Error en la respuesta del servidor'); // Mostrar mensaje de error del backend
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }

      // Manejar respuesta exitosa
      alert('Solicitud enviada exitosamente');
      navigate('/profile'); // Redirigir a la ruta /profile

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setErrorMessage(error.message); // Mostrar el mensaje de error en la página
    } finally {
      setIsLoading(false); // Finaliza el loader
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      'Si cancelas perderás toda la información cargada. ¿Estás seguro de que deseas cancelar?'
    );
    if (confirmCancel) {
      navigate('/profile'); // Redirige a la ruta /profile si el usuario confirma
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Solicitud de Empleo como Conductor</h2>

      {/* Mostrar mensaje de error si existe */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Aquí va el resto del formulario */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DriverApplicationForm;
