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

        if (response.status === 404) {
          // Si es un 404, consideramos que no hay solicitudes
          setJobApplications([]);
        } else if (!response.ok) {
          throw new Error('Error al obtener las solicitudes de empleo');
        } else {
          const data = await response.json();
          setJobApplications(data);  // Asumimos que el backend envía un array de solicitudes
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobApplications();
  }, []);

  // Función para regresar al perfil
  const goBackToProfile = () => {
    navigate('/profile');  // Redirigir a la página del perfil
  };

  if (loading) {
    return <div className="text-center my-5">Cargando solicitudes...</div>;
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
        <div className="text-center">
          <button className="btn btn-primary mt-3" onClick={goBackToProfile}>
            Regresar a mi Perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary" onClick={goBackToProfile}>
          <i className="bi bi-arrow-left"></i> Volver a mi Perfil
        </button>
      </div>
      <h2 className="text-center">Mis Solicitudes de Empleo</h2>
      {jobApplications.length === 0 ? (
        <div className="text-center">
          <p>No tienes solicitudes de empleo aún.</p>
          
        </div>
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
