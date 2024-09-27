import React from 'react';

import { useState, useEffect } from "react";
import UserInfo from '../../components/UserInfo';

const VerInfoUser = () => {

    const [idUser, setid] = useState(1)
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
            idUser: idUser,
            emailUser: correoUsuario
        });


        fetch(`http://localhost:3000/userRoute/user-info?${params.toString()}`, { method: 'GET' })
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
        setid(3)//Añadir aqui el ID del usuario que selecciono el Conductor
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