import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';

function AdminProfile() {
    const [userName, setUserName] = useState('');
    const isLoggedIn = true; // Cambiar según el estado de autenticación

    useEffect(() => {
        // Obtener el correo del localStorage
        const storedEmail = localStorage.getItem('correo');
        if (storedEmail) {
            setUserName(storedEmail);
        }
    }, []);

    return (
        <div>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} />
          <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '60px', marginBottom: '60px' }}>
            <AdminDashboard />
          </div>
          <Footer />
        </div>
    );
}

export default AdminProfile;
