import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AsistenDashboard from '../components/AsistenDashboard';

function AsistenProfile() {
    return (
        <div>
          <Navbar />
          <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '60px', marginBottom: '60px' }}>
            <AsistenDashboard />
          </div>
          <Footer />
        </div>
      );
}

export default AsistenProfile;
