import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function ReportarProblema() {

    const navigate = useNavigate();
    const [idReportado, setidReportado] = useState(null);
    const [nombre, setnombre] = useState('');
    const [descripcion, setdescripcion] = useState('');
    const [tipo, settipo] = useState('otro');
    const [message, setMessage] = useState('');
    const isLoggedIn = true;
    const [userName, setUserName] = useState('');
    const [token, settoken] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // 'success' o 'danger'
    const [showAlert, setShowAlert] = useState(false);

    //Listar viajes
    const [availableTrips, setAvailableTrips] = useState([]); // Estado para los viajes disponibles

    

    const handleReportarProblema = async () => {


        const data = {
            idReportado: idReportado,
            nombreReportado: nombre,
            fecha: new Date().toISOString().split('T')[0],
            descripcion: descripcion,
            tipo: tipo
        };
        const endpoint = `${config.apiUrl}/api/driverRequests/reportar-problema`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization':token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setAlertMessage(data.msg); // Guardar el mensaje del backend
                setAlertType('success'); // Tipo de alerta: éxito
                setShowAlert(true);
            })
            .catch((error) => {
                console.error('Error:', error);
                setAlertMessage('Error al realizar el reporte');
                setAlertType('danger'); // Tipo de alerta: error
                setShowAlert(true);
            });

    };

    useEffect(() => {
        // Obtener el correo del localStorage
        const storedEmail = localStorage.getItem('correo');
        const clave = localStorage.getItem('token');
        
        if (storedEmail) {
            setUserName(storedEmail);
            settoken(clave)
        }


        async function fetchActiveTrip() {
            try {
                const response = await fetch(`${config.apiUrl}/api/viajes/enCursoConductor`, { // Usa config.apiUrl
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
                const response = await fetch(`${config.apiUrl}/api/viajes/enCursoConductor`, { // Usa config.apiUrl
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

    const handleBack = () => {
        navigate('/driver');
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} userName={userName} />
            <br />
            <br />
            <div className='container'>
                <div class="card bg-light mb-3" >
                    {/* Mostrar la alerta si showAlert es true */}
                    {showAlert && (
                        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" onClick={() => setShowAlert(false)} aria-label="Close"></button>
                        </div>
                    )}
                    <div class="card-header"><h2>Reportar algun problema:</h2></div>
                    <div class="card-body">
                        <p class="text-success-emphasis">Debe ingresar el nombre del usuario para realizar el reporte</p>
                        

                        <div className="row">
                            <label>nombre del reportado:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setnombre(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <label>descripcion:</label>
                            <textarea
                                type="text"
                                value={descripcion}
                                onChange={(e) => setdescripcion(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <label>tipo:</label>
                            <input
                                type="text"
                                value={tipo}
                                placeholder='Otro'
                                onChange={(e) => settipo(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <button className="btn btn-outline-success" onClick={handleReportarProblema}>Reportar</button>
                            <button className="btn btn-secondary mt-4" onClick={handleBack}>
                                Regresar
                            </button>
                        </div>
                    </div>
                </div>


                {message && <p className="text-warning">{message}</p>}
            </div>


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

            
        </div>
        </>
    );

}

export default ReportarProblema;