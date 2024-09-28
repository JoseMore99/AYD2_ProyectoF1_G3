import React from 'react';
import iconDriver from '../assets/iconDriver.webp'; // Importa la imagen

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center p-4">
      <div className="container">

        <div>
          <img src={iconDriver} alt="Icono de QNAVE" style={{ width: '40px', marginTop: '10px' }} />
        </div>
          <a href="#" className="text-light mx-2"><i className="bi bi-whatsapp"></i></a>
          <a href="#" className="text-light mx-2"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-light mx-2"><i className="bi bi-instagram"></i></a>
        </div>

        <img  alt="QNAVE" className="mb-3" style={{ width: '50px' }} />
        <p>2020 - 2024 Todos los derechos reservados</p>
        <div>
        
      </div>
    </footer>
  );
}

export default Footer;
