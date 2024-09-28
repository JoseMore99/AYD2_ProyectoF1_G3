import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Navbar = ({ isLoggedIn, userName }) => {
  const navigate = useNavigate(); // Reemplaza useHistory por useNavigate
  const truncatedName = userName.length > 8 ? `${userName.substring(0, 8)}...` : userName;

  const handleLogout = async () => {
    try {
      // Opcional: Hacer una solicitud al backend para revocar el token
      const token = localStorage.getItem('token');
      await fetch(`${config.apiUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Enviar el token en el header
        },
      });

      // Eliminar todos los elementos de localStorage relacionados con la sesión
      localStorage.removeItem('token');
      localStorage.removeItem('correo');
      localStorage.removeItem('roles');
      
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/'); 
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark" style={{ marginTop: '0' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Q-NAVI</a>
        <div className="d-flex">
          {isLoggedIn ? (
            <>
              <span className="nav-text text-white me-3">Hola: {truncatedName}</span>
              <button className="nav-link text-white" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <a className="nav-link text-white" href="/register">Crear Cuenta</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
