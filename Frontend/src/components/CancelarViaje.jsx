import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'

const CancelarViaje = () => {
  const [activeTrip, setActiveTrip] = useState(null); // Estado para almacenar el viaje en curso
  const navigate = useNavigate();

  // Obtener token del localStorage
  const token = localStorage.getItem('token');

  // Función para obtener los viajes en curso
  useEffect(() => {
    async function fetchActiveTrip() {
      try {
        const response = await fetch(`${config.apiUrl}/api/viajes/encursoUser`, { // Usa config.apiUrl
          headers: {
            'x-auth-token': token, // Enviar el token en los headers
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.trips && data.trips.length > 0) {
          console.log(data.trips[0])
          setActiveTrip(data.trips[0]); // Guardar el viaje en curso
        } else {
          console.log('No tienes ningún viaje en curso.');
        }
      } catch (error) {
        console.error('Error al obtener el viaje en curso:', error);
      }

    }

    fetchActiveTrip();
  }, [token]);



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

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Tus Viajes</h2>
      <div className="d-flex flex-column align-items-center">
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
                    <strong>Conductor:</strong> {activeTrip.conductor?.nombre_completo || 'No disponible'}<br />
                    <strong>Tarifa:</strong> Q{activeTrip.tarifa?.monto || 'No disponible'}<br />
                    <strong>Punto de partida:</strong> {activeTrip.direccionPartida?.descripcion || 'No disponible'}<br />
                    <strong>Punto de llegada:</strong> {activeTrip.direccionLlegada?.descripcion || 'No disponible'}<br />
                    <strong>Estado:</strong> {activeTrip.estado}<br />
                    <strong>Fecha de inicio:</strong> {new Date(activeTrip.fecha_hora_inicio).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <button className="btn btn-outline-danger" onClick={cancelarViaje}>
          Cancelar Viaje
        </button>

        <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default CancelarViaje;
