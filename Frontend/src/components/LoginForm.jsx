import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import config from '../config'; // Importa el archivo de configuración

const LoginForm = () => {
  const [login, setLogin] = useState(''); // Ahora es 'login' en lugar de 'email'
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad de la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error
  const navigate = useNavigate();

  const handleLogin = async (login, password) => {
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/login`, { // Usa config.apiUrl
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password }) // Cambié 'correo' a 'login'
      });

      const data = await res.json();

      if (res.status === 200 && data.token) {
        // Si hay un token, el login fue exitoso
        localStorage.setItem('token', data.token);
        localStorage.setItem('correo', data.correo);
        
        const roles = data.roles ? [data.roles] : [];
        localStorage.setItem('roles', JSON.stringify(roles));

        // Navegación según el rol
        if (roles.includes('Administrador')) {
          navigate('/admin');
        } else if (roles.includes('Conductor')) {
          navigate('/driver');
        } else if (roles.includes('Asistente')) {
          navigate('/asistente');
        } else {
          navigate('/profile');
        }
      } else {
        // Si no hay token, significa que hubo un error
        setErrorMessage(data.msg || 'Error en el inicio de sesión');
      }
    } catch (err) {
      setErrorMessage('Error de conexión con el servidor');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpia el mensaje de error al enviar el formulario
    handleLogin(login, password); // Pasa 'login' y 'password'
  };

  return (
    <div className="card p-4 shadow" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Ingresa a tu cuenta Q-NAVI</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Correo electrónico o Nombre de Usuario</label> {/* Cambié la etiqueta */}
          <input 
            type="text" 
            className="form-control" 
            id="login" 
            placeholder="Ingresa tu correo o nombre de usuario" // Cambié el placeholder
            value={login}
            onChange={(e) => setLogin(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <div className="input-group">
            <input 
              type={showPassword ? 'text' : 'password'}  // Alterna entre 'text' y 'password'
              className="form-control" 
              id="password" 
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Ingresar a mi cuenta</button>
      </form>
      <div className="text-center mt-3">
        <a href="#">¿Olvidaste tu contraseña? Recupérala aquí.</a>
      </div>
    </div>
  );
};

export default LoginForm;
