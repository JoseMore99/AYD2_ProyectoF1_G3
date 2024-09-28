import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Principal() {
  // Para esta pantalla, asumimos que el usuario no está logueado
  const isLoggedIn = false;
  const userName = ''; 

  return (
    <div>
      {/* Paso de props al componente Navbar */}
      <Navbar isLoggedIn={isLoggedIn} userName={userName} />
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default Principal;
