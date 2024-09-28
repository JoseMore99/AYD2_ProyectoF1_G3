import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración

function SolicitudesConductor() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false); // Estado para manejar el procesamiento de las acciones
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener las solicitudes de empleo desde el backend
    const fetchSolicitudes = async () => {
      try {
        const token = localStorage.getItem('token');  // Obtener el token del localStorage

        const response = await fetch(`${config.apiUrl}/api/solicitudes`, { // Usa config.apiUrl
          method: 'GET',
          headers: {
            'x-auth-token': token,  // Enviar el token en el header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes de empleo.');
        }

        const data = await response.json();
        setSolicitudes(data);  // Guardar las solicitudes en el estado
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleAprobar = async (id) => {
    try {
      setProcessing(true);  // Mostrar indicador de procesamiento
      const token = localStorage.getItem('token');

      const response = await fetch(`${config.apiUrl}/api/solicitudes/${id}/aprobar`, { // Usa config.apiUrl
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al aprobar la solicitud.');
      }

      // Actualizar la lista de solicitudes después de la aprobación
      setSolicitudes(solicitudes.map((sol) => (sol.id_solicitud === id ? { ...sol, estado: 'aprobado' } : sol)));
    } catch (error) {
      alert('Hubo un problema al aprobar la solicitud: ' + error.message);
    } finally {
      setProcessing(false);  // Ocultar el indicador de procesamiento
    }
  };

  const handleRechazar = async (id) => {
    try {
      setProcessing(true);  // Mostrar indicador de procesamiento
      const token = localStorage.getItem('token');

      const response = await fetch(`${config.apiUrl}/api/solicitudes/${id}/rechazar`, { // Usa config.apiUrl
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al rechazar la solicitud.');
      }

      // Actualizar la lista de solicitudes después del rechazo
      setSolicitudes(solicitudes.map((sol) => (sol.id_solicitud === id ? { ...sol, estado: 'rechazado' } : sol)));
    } catch (error) {
      alert('Hubo un problema al rechazar la solicitud: ' + error.message);
    } finally {
      setProcessing(false);  // Ocultar el indicador de procesamiento
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando solicitudes...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center">Solicitudes de Conductores</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/asistente')}>Volver al Dashboard</button>
      {solicitudes.length === 0 ? (
        <p className="text-center">No hay solicitudes de empleo.</p>
      ) : (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud, index) => (
              <tr key={solicitud.id_solicitud}>
                <td>{index + 1}</td>
                <td>{solicitud.User ? solicitud.User.nombre_completo : 'Usuario no disponible'}</td>
                <td>{solicitud.User ? solicitud.User.correo : 'Correo no disponible'}</td>
                <td>{solicitud.User ? solicitud.User.numero_telefono : 'Teléfono no disponible'}</td>
                <td>{solicitud.estado}</td>
                <td>
                  {solicitud.estado === 'pendiente' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleAprobar(solicitud.id_solicitud)}
                        disabled={processing}  // Deshabilitar botón si se está procesando
                      >
                        {processing ? 'Procesando...' : 'Aceptar'}
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleRechazar(solicitud.id_solicitud)}
                        disabled={processing}  // Deshabilitar botón si se está procesando
                      >
                        {processing ? 'Procesando...' : 'Rechazar'}
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => navigate(`/solicitudes/${solicitud.id_solicitud}`)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  )}
                  {solicitud.estado !== 'pendiente' && <span>{solicitud.estado}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SolicitudesConductor;
