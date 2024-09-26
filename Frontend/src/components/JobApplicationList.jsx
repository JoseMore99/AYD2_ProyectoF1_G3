import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar hook para redirección

function JobApplicationList() {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook para manejar la redirección

  useEffect(() => {
    // Función para obtener las solicitudes de empleo desde el backend
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem('token');  // Usar la clave correcta ('token')

        if (!token) {
          throw new Error('Token no encontrado. Por favor, inicia sesión.');
        }

        const response = await fetch('http://localhost:3000/user/solicitudes', {
          method: 'GET',
          headers: {
            'x-auth-token': token,  // Incluir el token en el header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes de empleo');
        }

        const data = await response.json();
        setJobApplications(data);  // Asumimos que el backend envía un array de solicitudes
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, []);

  // Función para regresar al home
  const goBackHome = () => {
    navigate('/profile');  // Redirigir a la página principal
  };

  if (loading) {
    return <div className="text-center my-5">Cargando solicitudes...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary" onClick={goBackHome}>
          <i className="bi bi-arrow-left"></i> Volver al Inicio
        </button>
      </div>
      <h2 className="text-center">Mis Solicitudes de Empleo</h2>
      {jobApplications.length === 0 ? (
        <p className="text-center">No tienes solicitudes de empleo aún.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Fecha de Solicitud</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications.map((application, index) => (
              <tr key={application.id}>
                <td>{index + 1}</td>
                <td>{new Date(application.fecha_solicitud).toLocaleDateString()}</td>
                <td>{application.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default JobApplicationList;
