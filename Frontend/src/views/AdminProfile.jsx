import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';

function AdminProfile() {
    return (
        <div>
          <Navbar />
          <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '60px', marginBottom: '60px' }}>
            <AdminDashboard />
          </div>
          <Footer />
        </div>
      );
}

export default AdminProfile;
