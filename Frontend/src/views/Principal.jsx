import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Principal() {

    return (
      <div>
        <Navbar />
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <LoginForm />
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Principal