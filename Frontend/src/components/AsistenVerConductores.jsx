import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para manejar la navegación
import config from '../config'; // Asegúrate de ajustar la ruta según la ubicación de config.js

function AsistenVerConductores() {

    const token = localStorage.getItem('token');
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Para almacenar los usuarios filtrados
    const [selectedUser, setSelectedUser] = useState(null);
    const [reason, setReason] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false); // Control del modal
    const [search, setSearch] = useState(''); // Estado para manejar la búsqueda

    const navigate = useNavigate(); // Para manejar la navegación de regreso

    useEffect(() => {
        // Obtener lista de usuarios del backend usando fetch
        fetch(`${config.apiUrl}/userRoute/conductores`, { // Usa config.apiUrl
            headers: {
                'x-auth-token': token, // Enviar el token en los headers
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los usuarios');
                }
                return response.json();
            })
            .then(data => {
                setUsuarios(data);
                setFilteredUsuarios(data); // Inicialmente los usuarios filtrados son los mismos que los cargados
            })
            .catch(error => setErrorMessage(error.message));
    }, []);

    // Manejar la búsqueda de usuarios
    useEffect(() => {
        const filtered = usuarios.filter(usuario =>
            usuario.nombre_completo.toLowerCase().includes(search.toLowerCase()) ||
            usuario.correo.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsuarios(filtered);
    }, [search, usuarios]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setShowConfirm(true); // Mostrar el modal de confirmación
    };

    const renderRoles = (roles) => {
        if (roles.length === 0) {
            return 'Sin rol asignado';
        }
        return roles.map(role => role.role_name).join(', '); // Muestra todos los roles separados por comas
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Conductores</h2>

            {/* Botón para regresar a la vista de asistente */}
            <div className="mb-3">
                <button className="btn btn-secondary" onClick={() => navigate('/asistente')}>
                    <i className="bi bi-arrow-left"></i> Regresar al Dashboard
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o correo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Lista de usuarios */}
            <div className="row">
                {filteredUsuarios.length > 0 ? (
                    filteredUsuarios.map(usuario => (
                        <div className="col-md-4 mb-4" key={usuario.id}>
                            <div className={`card border-${usuario.estado === 'activo' ? 'success' : 'danger'} h-100`}>
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{usuario.nombre_completo}</h5>
                                    <p className="card-text"><strong>Correo:</strong> {usuario.correo}</p>
                                    <p className="card-text"><strong>Rol:</strong> {renderRoles(usuario.Roles)}</p>
                                    <p className={`card-text text-${usuario.estado === 'activo' ? 'success' : 'danger'}`}>
                                        <strong>Estado:</strong> {usuario.estado}
                                    </p>
                                    <button
                                        className="btn btn-outline-warning btn-sm"
                                        onClick={() => handleSelectUser(usuario)}
                                    >
                                        Mostrar Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No se encontraron usuarios con el término de búsqueda ingresado.</p>
                )}
            </div>

            {/* Modal de confirmación para dar de baja */}
            {showConfirm && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles Conductor</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowConfirm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Usuario:</strong> {selectedUser && selectedUser.nombre_completo}</p>
                                <p><strong>Correo:</strong> {selectedUser && selectedUser.correo}</p>
                                <p><strong>Estado:</strong> {selectedUser && selectedUser.estado}</p>
                                <p><strong>Telefono:</strong> {selectedUser && selectedUser.numero_telefono}</p>
                                <p><strong>Fecha Nacimiento:</strong> {selectedUser && selectedUser.fecha_nacimiento}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AsistenVerConductores;
