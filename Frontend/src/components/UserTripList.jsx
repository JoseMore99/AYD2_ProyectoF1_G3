import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración
import { Modal, Button } from 'react-bootstrap'; //importar para utilizar Modal


function UserTripList() {
    const [activeTrip, setActiveTrip] = useState(null); // Estado para almacenar el viaje en curso
    const [availableTrips, setAvailableTrips] = useState([]); // Estado para los viajes disponibles
    const navigate = useNavigate();

    // Obtener token del localStorage
    const token = localStorage.getItem('token');

    // Función para obtener los viajes en curso
    useEffect(() => {
        async function fetchActiveTrip() {
            try {
                const response = await fetch(`${config.apiUrl}/api/viajes/enCursoUsuario`, { // Usa config.apiUrl
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
                const response = await fetch(`${config.apiUrl}/api/viajes/enCursoUsuario`, { // Usa config.apiUrl
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

    // Navegar a la ruta anterior (/driver)
    const handleBack = () => {
        navigate('/profile');
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
            <h3 className="text-center mt-4">Viajes</h3>

            {/* Mostrar los viajes pendientes */}
            {availableTrips.length > 0 ? (
                <div className="row">
                    {availableTrips.map((trip) => (
                        <div key={trip.id_viaje} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="row g-0">
                                    <div className="col-4 d-flex align-items-center justify-content-center">
                                        <img
                                            src="https://via.placeholder.com/100"
                                            className="img-fluid rounded-start"
                                            alt="Perfil"
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Viaje</h5>
                                            <p className="card-text">
                                                <strong>Usuario:</strong> {trip.usuario?.nombre_completo || 'No disponible'}
                                                <br />
                                                <strong>Tarifa:</strong> Q{trip.tarifa?.monto || 'No disponible'}
                                                <br />
                                                <strong>Punto de partida:</strong> {trip.direccionPartida?.descripcion || 'No disponible'}
                                                <br />
                                                <strong>Punto de llegada:</strong> {trip.direccionLlegada?.descripcion || 'No disponible'}
                                                <br />
                                                <strong>Estado:</strong> {trip.estado}
                                                <br />
                                                <strong>Fecha de inicio:</strong> {new Date(trip.fecha_hora_inicio).toLocaleString()}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleShow(trip)}
                                                >
                                                    Ver Chofer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay viajes disponibles en este momento.</p>
            )}

            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary mt-4" onClick={handleBack}>
                    Regresar
                </button>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Chofer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTrip ? (
                        <div>
                            <p><strong>Conductor:</strong> {selectedTrip.conductor?.nombre_completo || 'No disponible'}</p>
                            <p><strong>Telefono:</strong> {selectedTrip.conductor?.numero_telefono || 'No disponible'}</p>
                            <p><strong>Marca Auto:</strong> {selectedTrip.conductor?.Vehiculos[0].marca || 'No disponible'}</p>
                            <p><strong>Placas:</strong> {selectedTrip.conductor?.Vehiculos[0].numero_placa|| 'No disponible'}</p>
                            <p><strong>Año:</strong> {selectedTrip.conductor?.Vehiculos[0].ano || 'No disponible'}</p>
                            <img
                                            src= {selectedTrip.conductor?.Vehiculos[0].foto_vehiculo}
                                            className="img-fluid rounded-start"
                                            alt="Perfil" 
                            />
                        </div>
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

export default UserTripList;
