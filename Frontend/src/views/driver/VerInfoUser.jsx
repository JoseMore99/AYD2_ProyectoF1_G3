import React from 'react';

import { useState, useEffect } from "react";
import UserInfo from '../../components/UserInfo';
import config from '../../config';

const VerInfoUser = ({ userId }) => {

    const [correoUsuario, setcorreoUsuario] = useState("")
    const [actual, setactual] = useState({
        id: 0,
        correo: '',
        nombre_completo: '',
        numero_telefono: '',
        fecha_nacimiento: '',
        genero: '',
        fotografia_dpi: null,
        password: '',
        created_at: null
    })

    function buscarUsuario() {
        const params = new URLSearchParams({
            idUser: userId,
            emailUser: correoUsuario
        });

            
        fetch(`${config.apiUrl}/userRoute/user-info?${params.toString()}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setactual(data.usuario)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        setcorreoUsuario("")
        buscarUsuario();
    }, []);

    return (
        <div className='container'>
            <h1>Informacio del Usuario</h1>
            <UserInfo user={actual} />
        </div>
    );
};

export default VerInfoUser;