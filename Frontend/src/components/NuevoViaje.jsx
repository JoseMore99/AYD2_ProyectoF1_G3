import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración

function NuevoViaje() {
  const [puntosPartida, setPuntosPartida] = useState([]);
  const [puntosLlegada, setPuntosLlegada] = useState([]);
  const [partidaSeleccionada, setPartidaSeleccionada] = useState('');
  const [llegadaSeleccionada, setLlegadaSeleccionada] = useState('');
  const [tarifa, setTarifa] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Obtener el correo almacenado en el localStorage
  const storedEmail = localStorage.getItem('correo');
  if (!storedEmail) {
    alert('Debes iniciar sesión para solicitar un viaje.');
    navigate('/login');  // Redirigir al login si no hay correo en localStorage
    return;
  }

  // Obtener puntos de partida al cargar el componente
  useEffect(() => {
    fetch(`${config.apiUrl}/api/direcciones/partida`) // Usa config.apiUrl
      .then(response => response.json())
      .then(data => setPuntosPartida(data))
      .catch(error => console.error('Error obteniendo puntos de partida:', error));
  }, []);

  // Obtener puntos de llegada cuando se selecciona el punto de partida
  const handlePartidaChange = (e) => {
    const idPartida = e.target.value;
    setPartidaSeleccionada(idPartida);
    setLlegadaSeleccionada('');  // Resetear la selección de llegada
    setTarifa(null);  // Resetear la tarifa

    fetch(`${config.apiUrl}/api/direcciones/llegada/${idPartida}`) // Usa config.apiUrl
      .then(response => response.json())
      .then(data => setPuntosLlegada(data))
      .catch(error => console.error('Error obteniendo puntos de llegada:', error));
  };

  // Obtener la tarifa cuando se selecciona el punto de llegada
  const handleLlegadaChange = (e) => {
    const idLlegada = e.target.value;
    setLlegadaSeleccionada(idLlegada);

    fetch(`${config.apiUrl}/api/tarifas/${partidaSeleccionada}/${idLlegada}`) // Usa config.apiUrl
      .then(response => response.json())
      .then(data => setTarifa(data.monto))
      .catch(error => console.error('Error obteniendo la tarifa:', error));
  };

  // Manejar el envío de la solicitud de viaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${config.apiUrl}/api/viajes`, { // Usa config.apiUrl
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_usuario: storedEmail,  // Enviar el correo del usuario
          punto_partida: partidaSeleccionada,
          punto_llegada: llegadaSeleccionada,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }

      alert('Viaje solicitado con éxito');
      navigate('/profile');  // Redirigir al perfil del usuario después de solicitar el viaje
    } catch (error) {
      console.error('Error solicitando viaje:', error);
      alert('Hubo un problema al solicitar el viaje. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Solicita un Nuevo Viaje</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="partida" className="form-label">Punto de Partida</label>
          <select
            id="partida"
            className="form-select"
            value={partidaSeleccionada}
            onChange={handlePartidaChange}
            required
          >
            <option value="">Selecciona tu punto de partida</option>
            {puntosPartida.map(partida => (
              <option key={partida.id_direccion} value={partida.id_direccion}>
                {partida.zona}
              </option>
            ))}
          </select>
        </div>

        {puntosLlegada.length > 0 && (
          <div className="mb-3">
            <label htmlFor="llegada" className="form-label">Punto de Llegada</label>
            <select
              id="llegada"
              className="form-select"
              value={llegadaSeleccionada}
              onChange={handleLlegadaChange}
              required
            >
              <option value="">Selecciona tu punto de llegada</option>
              {puntosLlegada.map(llegada => (
                <option key={llegada.id_direccion} value={llegada.id_direccion}>
                  {llegada.zona}
                </option>
              ))}
            </select>
          </div>
        )}

        {tarifa && (
          <div className="mb-3">
            <label className="form-label">Tarifa del Viaje: Q {tarifa}</label>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Solicitando...' : 'Solicitar Viaje'}
        </button>
      </form>
    </div>
  );
}

export default NuevoViaje;
