import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración
import { Modal, Button } from 'react-bootstrap'; //importar para utilizar Modal
import VerInfoUser from '../views/driver/VerInfoUser';

function TripList() {
  const [activeTrip, setActiveTrip] = useState(null); // Estado para almacenar el viaje en curso
  const [availableTrips, setAvailableTrips] = useState([]); // Estado para los viajes disponibles
  const navigate = useNavigate();

  // Obtener token del localStorage
  const token = localStorage.getItem('token');

  // Función para obtener los viajes en curso
  useEffect(() => {
    async function fetchActiveTrip() {
      try {
        const response = await fetch(`${config.apiUrl}/api/viajes/encurso`, { // Usa config.apiUrl
          headers: {
            'x-auth-token': token, // Enviar el token en los headers
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.trips && data.trips.length > 0) {
          setActiveTrip(data.trips[0]); // Guardar el viaje en curso
        } else {
          console.log('No tienes ningún viaje en curso.');
        }
      } catch (error) {
        console.error('Error al obtener el viaje en curso:', error);
      }
    }

    // Función para obtener los viajes pendientes
    async function fetchAvailableTrips() {
      try {
        const response = await fetch(`${config.apiUrl}/api/viajes/activos`, { // Usa config.apiUrl
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.trips) {
          setAvailableTrips(data.trips);
        } else {
          console.error('No se encontraron viajes pendientes.');
        }
      } catch (error) {
        console.error('Error al obtener los viajes pendientes:', error);
      }
    }

    fetchActiveTrip();
    fetchAvailableTrips();
  }, [token]);

  // Función para aceptar un viaje
  const handleAccept = async (tripId) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/viajes/${tripId}/accept`, { // Usa config.apiUrl
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.success) {
        alert('Viaje aceptado con éxito');
        setAvailableTrips((prevTrips) => prevTrips.filter((trip) => trip.id_viaje !== tripId)); // Remover el viaje aceptado
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al aceptar el viaje:', error);
    }
  };

  const cancelarViaje = async () => {
    const idViaje = null;
    try {
      const response = await fetch(`${config.apiUrl}/userRoute/cancelar-viaje`, { // Usa config.apiUrl
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({ idViaje }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Navegar a la ruta anterior (/driver)
  const handleBack = () => {
    navigate('/driver');
  };

  const [show, setShow] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (trip) => {
      setSelectedTrip(trip);
      setShow(true);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Tus Viajes</h2>
      <div className="d-flex flex-column align-items-center">

        {/* Mostrar el viaje en curso si existe */}
        {activeTrip && (
          <div className="card mb-3" style={{ width: '30rem', border: '2px solid green' }}>
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img
                  src="https://via.placeholder.com/100"
                  className="img-fluid rounded-start"
                  alt="Perfil"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Viaje en curso</h5>
                  <p className="card-text">
                    <strong>Usuario:</strong> {activeTrip.usuario?.nombre_completo || 'No disponible'}<br />
                    <strong>Tarifa:</strong> Q{activeTrip.tarifa?.monto || 'No disponible'}<br />
                    <strong>Punto de partida:</strong> {activeTrip.direccionPartida?.descripcion || 'No disponible'}<br />
                    <strong>Punto de llegada:</strong> {activeTrip.direccionLlegada?.descripcion || 'No disponible'}<br />
                    <strong>Estado:</strong> {activeTrip.estado}<br />
                    <strong>Fecha de inicio:</strong> {new Date(activeTrip.fecha_hora_inicio).toLocaleString()}
                  </p>
                  <button className="btn btn-outline-danger" onClick={cancelarViaje}>
                        Cancelar Viaje
                      </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar los viajes pendientes */}
        <h3 className="text-center mt-4">Viajes Disponibles</h3>
        {availableTrips.length > 0 ? (
          availableTrips.map((trip) => (
            <div key={trip.id_viaje} className="card mb-3" style={{ width: '30rem' }}>
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src="https://via.placeholder.com/100"
                    className="img-fluid rounded-start"
                    alt="Perfil"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Nuevo Viaje</h5>
                    <p className="card-text">
                      <strong>Usuario:</strong> {trip.usuario?.nombre_completo || 'No disponible'}<br />
                      <strong>Tarifa:</strong> Q{trip.tarifa?.monto || 'No disponible'}<br />
                      <strong>Punto de partida:</strong> {trip.direccionPartida?.descripcion || 'No disponible'}<br />
                      <strong>Punto de llegada:</strong> {trip.direccionLlegada?.descripcion || 'No disponible'}<br />
                      <strong>Estado:</strong> {trip.estado}<br />
                      <strong>Fecha de inicio:</strong> {new Date(trip.fecha_hora_inicio).toLocaleString()}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(trip.id_viaje)}
                        disabled={!!activeTrip} // Deshabilitar si hay un viaje en curso
                      >
                        Aceptar
                      </button>
                      <button
                          className="btn btn-success"
                          onClick={() => handleShow(trip)}
                      >
                          Ver Usuario
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay viajes disponibles en este momento.</p>
        )}
        <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Regresar
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {selectedTrip ? (
                <VerInfoUser userId={selectedTrip.id_usuario}/>
            ) : (
                <p>Loading...</p>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
    </div>
  );
}

export default TripList;
