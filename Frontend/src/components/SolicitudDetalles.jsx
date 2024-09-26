import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SolicitudDetalles() {
  const { id } = useParams();  // Obtener el ID de la solicitud desde la URL
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Hook para navegar entre rutas

  useEffect(() => {
    // Función para obtener los detalles de la solicitud
    const fetchSolicitud = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/solicitudes/${id}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la solicitud.');
        }

        const data = await response.json();
        setSolicitud(data);  // Guardar los detalles de la solicitud
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5">Cargando detalles...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!solicitud) {
    return <div>No se encontraron detalles de la solicitud.</div>;
  }

  // Función para convertir un array buffer a una cadena base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = buffer;  // Es un array de números
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  // Obtener la imagen del solicitante
  let fotoSolicitanteSrc = null;
  if (solicitud.foto && solicitud.foto.data && solicitud.foto.data.length > 0) {
    const base64String = arrayBufferToBase64(solicitud.foto.data);
    fotoSolicitanteSrc = `data:image/jpeg;base64,${base64String}`;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center">Detalles de la Solicitud</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/ver-solicitudes')}>Volver a las solicitudes</button>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{solicitud.User ? solicitud.User.nombre_completo : 'Usuario no disponible'}</h5>
          <p className="card-text">Correo: {solicitud.User ? solicitud.User.correo : 'No disponible'}</p>
          <p className="card-text">Teléfono: {solicitud.User ? solicitud.User.numero_telefono : 'No disponible'}</p>
          <p className="card-text">Estado: {solicitud.estado}</p>
          <p className="card-text">Fecha de Solicitud: {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
          <p className="card-text">Dirección: {solicitud.direccion}</p>
          <p className="card-text">Estado Civil: {solicitud.marital_status}</p>
          <p className="card-text">Género: {solicitud.gender}</p>

          {solicitud.User && solicitud.User.Vehiculos && solicitud.User.Vehiculos.length > 0 && (
            <div className="mt-4">
              <h5>Detalles del Vehículo</h5>
              {solicitud.User.Vehiculos.map((vehiculo, index) => {
                // Obtener la imagen del vehículo
                let fotoVehiculoSrc = null;
                if (vehiculo.foto_vehiculo && vehiculo.foto_vehiculo.data && vehiculo.foto_vehiculo.data.length > 0) {
                  const base64StringVehiculo = arrayBufferToBase64(vehiculo.foto_vehiculo.data);
                  fotoVehiculoSrc = `data:image/jpeg;base64,${base64StringVehiculo}`;
                }

                return (
                  <div key={index} className="mb-3">
                    <p>Marca: {vehiculo.marca}</p>
                    <p>Año: {vehiculo.ano}</p>
                    <p>Número de Placa: {vehiculo.numero_placa}</p>
                    {fotoVehiculoSrc && (
                      <img
                        src={fotoVehiculoSrc}
                        alt="Foto del vehículo"
                        className="img-fluid"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {fotoSolicitanteSrc && (
            <div className="mt-4">
              <h5>Foto del solicitante</h5>
              <img
                src={fotoSolicitanteSrc}
                alt="Foto del solicitante"
                className="img-fluid"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SolicitudDetalles;
