import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta privada
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const storedRoles = JSON.parse(localStorage.getItem('roles')) || []; // Recupera el rol almacenado como un arreglo

  if (!token) {
    return <Navigate to="/" />; // Redirige a la página principal si no hay token
  }

  // Verifica si el usuario tiene al menos uno de los roles necesarios
  if (role && !storedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirige si no tiene el rol adecuado
  }

  return children;
};

export default PrivateRoute;
