import React from 'react';
import React, { useState, useEffect } from 'react';

const CancelarViaje = () => {
const [token, settoken] = useState('');
  const cancelarViaje = async () => {
    const idViaje = null; 
    try {
      const response = await fetch(`http://localhost:3000/userRoute/cancelar-viaje`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization':token,
        },
        body: JSON.stringify({ idViaje: idViaje }), 
      });

      if (response.ok) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  useEffect(() => {
    const clave = localStorage.getItem('token');
    
    if (clave) {
        settoken(clave)
    }
}, []);

  return (
    <div>
      <button className="btn btn-outline-danger" onClick={cancelarViaje}>Cancelar Viaje</button>
    </div>
  );
};

export default CancelarViaje;