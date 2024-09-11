import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark" style={{ marginTop: '0' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Q-NAVI</a>
        <div className="d-flex">
          <a className="btn btn-outline-light me-2" href="#">Crear Cuenta</a>
          <a className="btn btn-outline-light" href="#">Ingresar</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
