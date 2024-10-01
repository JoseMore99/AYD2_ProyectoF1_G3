import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'

const RegisterUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre_completo: '',
        fecha_nacimiento: '',
        genero: '',
        correo: '',
        numero_telefono: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBack = () => {
        navigate('/');
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        console.log('Datos de usuario registrado:', formData);
        const endpoint = `${config.apiUrl}/userRoute/create-user`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                alert('Success:', data.msg);
                setFormData({
                    nombre_completo: '',
                    fecha_nacimiento: '',
                    genero: '',
                    correo: '',
                    numero_telefono: '',
                    password: '',
                    confirmPassword: '',
                });
                setErrorMessage('');
                handleBack()
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage(`Error al realizar el reporte`);
            });
    };

    return (
        <div className="container  my-5">
            <div className="card text-white bg-dark mb-3" >
                <div className="card-header">
                    <h2>Registrar Usuario</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre completo:</label>
                            <input
                                type="text"
                                name="nombre_completo"
                                className="form-control"
                                value={formData.nombre_completo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha de nacimiento:</label>
                            <input
                                type="date"
                                name="fecha_nacimiento"
                                className="form-control"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Género:</label>
                            <select
                                name="genero"
                                className="form-control"
                                value={formData.genero}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu género</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Correo:</label>
                            <input
                                type="email"
                                name="correo"
                                className="form-control"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Número de teléfono:</label>
                            <input
                                type="tel"
                                name="numero_telefono"
                                className="form-control"
                                value={formData.numero_telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirmar contraseña:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {errorMessage && <p className="text-danger-emphasis">{errorMessage}</p>}
                        <br />
                        <button type="submit" className="btn btn-secondary">Registrar</button>
                    </form>
                </div>
            </div>
            <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Regresar
        </button>


        </div>
    );
};

export default RegisterUser;