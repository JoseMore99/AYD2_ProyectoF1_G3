import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:3000';

function TripList() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // Obtener token del localStorage
  const token = localStorage.getItem('token');

  // Función para obtener los viajes activos
  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch(`${apiUrl}/api/viajes/activos`, {
          headers: {
            'x-auth-token': token, // Enviar el token en los headers
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.trips) {
          setTrips(data.trips);
        } else {
          console.error('No se encontraron viajes activos');
        }
      } catch (error) {
        console.error('Error al obtener los viajes:', error);
      }
    }

    fetchTrips();
  }, [token]);

  // Función para aceptar un viaje
  const handleAccept = async (tripId) => {
    try {
      const response = await fetch(`${apiUrl}/api/viajes/${tripId}/accept`, {
        method: 'POST',
        headers: {
          'x-auth-token': token, // Enviar el token en los headers
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.success) {
        alert('Viaje aceptado con éxito');
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id_viaje !== tripId)); // Remover el viaje aceptado
      } else {
        alert('El viaje ya fue aceptado por otro conductor');
      }
    } catch (error) {
      console.error('Error al aceptar el viaje:', error);
    }
  };

  // Función para rechazar un viaje
  const handleReject = (tripId) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id_viaje !== tripId)); // Remover el viaje rechazado
  };

  // Navegar a la ruta anterior (/driver)
  const handleBack = () => {
    navigate('/driver');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Aceptar Nuevo Viaje</h2>
      <div className="d-flex flex-column align-items-center">
        {trips.length > 0 ? (
          trips.map((trip) => (
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
                      <strong>Punto de partida:</strong> {trip.direccionPartida?.direccion || 'No disponible'}<br />
                      <strong>Punto de llegada:</strong> {trip.direccionLlegada?.direccion || 'No disponible'}<br />
                      <strong>Estado:</strong> {trip.estado}<br />
                      <strong>Fecha de inicio:</strong> {new Date(trip.fecha_hora_inicio).toLocaleString()}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(trip.id_viaje)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(trip.id_viaje)}
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay viajes activos en este momento.</p>
        )}
        <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Regresar
        </button>
      </div>
    </div>
  );
}

export default TripList;
