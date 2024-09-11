import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center p-4">
      <div className="container">
        <img src="/assets/LogoQnave.jpeg" alt="QNAVE Logo" className="mb-3" style={{ width: '50px' }} />
        <p>2020 - 2024 Todos los derechos reservados</p>
        <div>
          <a href="#" className="text-light mx-2"><i className="bi bi-whatsapp"></i></a>
          <a href="#" className="text-light mx-2"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-light mx-2"><i className="bi bi-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
