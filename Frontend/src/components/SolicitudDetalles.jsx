import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SolicitudDetalles() {
  const { id } = useParams();  // Obtener el ID de la solicitud desde la URL
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState('');  // Estado para controlar la imagen en el modal

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

  // Función para abrir el modal con la imagen seleccionada
  const handleImageClick = (url) => {
    setModalImage(url);  // Configura la imagen que se va a mostrar en el modal
    const modal = new window.bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  };

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
              {solicitud.User.Vehiculos.map((vehiculo, index) => (
                <div key={index} className="mb-3">
                  <p>Marca: {vehiculo.marca}</p>
                  <p>Año: {vehiculo.ano}</p>
                  <p>Número de Placa: {vehiculo.numero_placa}</p>
                  {vehiculo.foto_vehiculo && (
                    <img
                      src={vehiculo.foto_vehiculo}  // URL de la foto del vehículo desde S3
                      alt="Foto del vehículo"
                      className="img-thumbnail"  // Clase de Bootstrap para estilo de imagen
                      style={{ width: '150px', cursor: 'pointer' }}  // Tamaño controlado
                      onClick={() => handleImageClick(vehiculo.foto_vehiculo)}  // Abre el modal al hacer clic
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {solicitud.foto && (
            <div className="mt-4">
              <h5>Foto del solicitante</h5>
              <img
                src={solicitud.foto}  // URL de la foto del solicitante desde S3
                alt="Foto del solicitante"
                className="img-thumbnail"  // Clase de Bootstrap para estilo de imagen
                style={{ width: '150px', cursor: 'pointer' }}  // Tamaño controlado
                onClick={() => handleImageClick(solicitud.foto)}  // Abre el modal al hacer clic
              />
            </div>
          )}

          {solicitud.cv && (
            <div className="mt-4">
              <h5>Currículum</h5>
              <a href={solicitud.cv} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Ver CV
              </a>  {/* Enlace para descargar o visualizar el CV */}
            </div>
          )}
        </div>
      </div>

      {/* Modal para mostrar la imagen ampliada */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="imageModalLabel">Imagen</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <img src={modalImage} alt="Ampliada" className="img-fluid" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitudDetalles;
