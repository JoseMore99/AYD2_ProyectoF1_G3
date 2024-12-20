import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:3000';

function DriverApplicationForm() {

  const storedEmail = localStorage.getItem('correo');
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
  const navigate = useNavigate(); // Hook para redirigir

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

    // Validaciones
    const age = parseInt(formData.age, 10);
    const phoneRegex = /^[0-9]{8}$/;
    const dpiRegex = /^[0-9]{13}$/;

    if (age < 18 || age > 90) {
      alert('La edad debe estar entre 18 y 90 años.');
      setIsLoading(false);
      return;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('El número de teléfono debe contener exactamente 8 dígitos numéricos.');
      setIsLoading(false);
      return;
    }

    if (!dpiRegex.test(formData.dpi)) {
      alert('El DPI debe contener exactamente 13 dígitos.');
      setIsLoading(false);
      return;
    }

    if (!formData.cv || !formData.photo || !formData.vehiclePhoto) {
      alert('Debes adjuntar tu CV, una fotografía y una foto del vehículo.');
      setIsLoading(false);
      return;
    }

    const currentYear = new Date().getFullYear();
    if (parseInt(formData.vehicleYear) < 1910 || parseInt(formData.vehicleYear) > currentYear) {
      alert('Por favor ingresa un año de vehículo válido.');
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
    const storedEmail = localStorage.getItem('correo');
    if (storedEmail) {
      formDataToSend.append('email', storedEmail);
    }

    try {
      console.log([...formDataToSend]); // Verificar los datos a enviar
      // Enviar solicitud al backend usando fetch
      const response = await fetch(`${apiUrl}/api/driverRequests`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }

      // Manejar respuesta exitosa
      alert('Solicitud enviada exitosamente');
      navigate('/profile'); // Redirigir a la ruta /profile

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un problema al enviar la solicitud. Inténtalo de nuevo más tarde.');
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
      <form onSubmit={handleSubmit}>


        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Nombre Completo</label>
          <input type="text" className="form-control" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
          <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Edad</label>
          <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="dpi" className="form-label">Número de DPI</label>
          <input type="text" className="form-control" id="dpi" name="dpi" value={formData.dpi} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="email" readOnly name="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cv" className="form-label">Papelería Completa (CV en PDF)</label>
          <input type="file" className="form-control" id="cv" name="cv" accept=".pdf" onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Fotografía</label>
          <input type="file" className="form-control" id="photo" name="photo" accept="image/*" onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="vehiclePhoto" className="form-label">Fotografía del Vehículo</label>
          <input type="file" className="form-control" id="vehiclePhoto" name="vehiclePhoto" accept="image/*" onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="licensePlate" className="form-label">Número de Placa</label>
          <input type="text" className="form-control" id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="vehicleBrand" className="form-label">Marca del Vehículo</label>
          <input type="text" className="form-control" id="vehicleBrand" name="vehicleBrand" value={formData.vehicleBrand} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="vehicleYear" className="form-label">Año del Vehículo</label>
          <input type="number" className="form-control" id="vehicleYear" name="vehicleYear" value={formData.vehicleYear} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Género</label>
          <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="">Selecciona...</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="maritalStatus" className="form-label">Estado Civil</label>
          <select className="form-control" id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required>
            <option value="">Selecciona...</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección de Domicilio</label>
          <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DriverApplicationForm;
