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
    }, []);

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
                        <p class="text-success-emphasis">Debe ingresar El id o el nombre del usuario para realizar el reporte</p>
                        <div className="row">
                            <label>id:</label>
                            <input
                                type="text"
                                value={idReportado}
                                onChange={(e) => setidReportado(e.target.value)}
                            />
                        </div>

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
        </>
    );

}

export default ReportarProblema;