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
    const [token, settoken] = useState('');

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
                'authorization':token
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
        // Obtener el correo del localStorage
        const storedEmail = localStorage.getItem('correo');
        const clave = localStorage.getItem('token');
        
        if (storedEmail) {
            setUserName(storedEmail);
            settoken(clave)
        }
    }, []);

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
            </div>
        </>
    );
}

export default ReportarProblema;