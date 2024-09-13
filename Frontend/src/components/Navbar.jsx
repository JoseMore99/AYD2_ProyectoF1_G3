import React from 'react';

const Navbar = ({ isLoggedIn, userName }) => {
  const truncatedName = userName.length > 8 ? `${userName.substring(0, 8)}...` : userName;

  return (
    <nav className="navbar navbar-dark bg-dark" style={{ marginTop: '0' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Q-NAVI</a>
        <div className="d-flex">
          {isLoggedIn ? (
            <>
              <span className="nav-text text-white me-3">Hola: {truncatedName}</span>
              <a className="nav-link text-white" href="/logout">Cerrar Sesión</a>
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
