import React, { useState, useEffect } from 'react';
import config from '../config'; // Importa el archivo de configuración

const CancelarViaje = () => {
  const [token, setToken] = useState('');

  const cancelarViaje = async () => {
    const idViaje = null; 
    try {
      const response = await fetch(`${config.apiUrl}/userRoute/cancelar-viaje`, { // Usa config.apiUrl
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token,
        },
        body: JSON.stringify({ idViaje }), 
      });

      const data = await response.json();

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
      setToken(clave);
    }
  }, []);

  return (
    <div>
      <button className="btn btn-outline-danger" onClick={cancelarViaje}>
        Cancelar Viaje
      </button>
    </div>
  );
};

export default CancelarViaje;
