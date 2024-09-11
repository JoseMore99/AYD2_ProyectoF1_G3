import React from 'react';

function ButtonNewTrip() {
  return (
    <div className="card text-center shadow-sm" style={{ width: '18rem', padding: '20px' }}>
      <i className="bi bi-car-front" style={{ fontSize: '3rem' }}></i>
      <h5 className="card-title mt-3">Solicita nuevo viaje</h5>
      <button className="btn btn-primary mt-3">Nuevo viaje</button>
    </div>
  );
}

export default ButtonNewTrip;
