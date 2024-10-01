import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import config from '../../config';

function ReportarProblema() {

    const [idReportado, setidReportado] = useState(null);
    const [nombre, setnombre] = useState('');
    const [descripcion, setdescripcion] = useState('');
    const [tipo, settipo] = useState('otro');
    const [message, setMessage] = useState('');
    const isLoggedIn = true;
    const [userName, setUserName] = useState('');
    const [activeTrip, setActiveTrip] = useState([]);
    const token = localStorage.getItem('token');

    const handleReportarProblema = async () => {


        const data = {
            idReportado: idReportado,
            nombreReportado: nombre,
            fecha: new Date().toISOString().split('T')[0],
            descripcion: descripcion,
            tipo: tipo

        };
        const endpoint = `${config.apiUrl}/userRoute/reportar-problema`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setMessage(data.msg);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage(`Error al realizar el reporte`);
            });

    };


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
                    console.log(data.trips)
                    setActiveTrip(data.trips);
                } else {
                    console.log('No tienes ningún viaje en curso.');
                }
            } catch (error) {
                console.error('Error al obtener el viaje en curso:', error);
            }

        }

        fetchActiveTrip();
        const storedEmail = localStorage.getItem('correo');

        if (storedEmail) {
            setUserName(storedEmail);
        }
    }, [token]);

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} userName={userName} />
            <br />
            <br />
            <div className='container'>
                <div class="card bg-light mb-3" >
                    <div class="card-header"><h2>Reportar algun problema:</h2></div>
                    <div class="card-body">
                        <p class="text-success-emphasis">Debe ingresar El id o el nombre del conductor para realizar el reporte</p>
                        <div className="row">
                            <label>id:</label>
                            <input
                                type="text"
                                value={idReportado}
                                onChange={(e) => setidReportado(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <label>nombre de caso:</label>
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
                                onChange={(e) => settipo(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <button className="btn btn-outline-success" onClick={handleReportarProblema}>Reportar</button>
                        </div>
                    </div>
                </div>


                {message && <p className="text-warning">{message}</p>}

                {activeTrip.length > 0 ? (
                    activeTrip.map((trip) => (
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
                                            <strong>Conductor:</strong> {trip.conductor?.nombre_completo || 'No disponible'}<br />
                                            <strong>Tarifa:</strong> Q{trip.tarifa?.monto || 'No disponible'}<br />
                                            <strong>Punto de partida:</strong> {trip.direccionPartida?.descripcion || 'No disponible'}<br />
                                            <strong>Punto de llegada:</strong> {trip.direccionLlegada?.descripcion || 'No disponible'}<br />
                                            <strong>Estado:</strong> {trip.estado}<br />
                                            <strong>Fecha de inicio:</strong> {new Date(trip.fecha_hora_inicio).toLocaleString()}
                                        </p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay viajes disponibles en este momento.</p>
                )}
            </div>
        </>
    );
}

export default ReportarProblema;