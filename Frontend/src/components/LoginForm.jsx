import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad de la contraseña
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: email, password })
      });

      const data = await res.json();

      if (data.token) {
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('correo', data.correo);
        
        const roles = data.roles ? [data.roles] : [];
        localStorage.setItem('roles', JSON.stringify(roles));

        console.log('Roles:', roles);
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
        console.error('Login fallido');
      }
    } catch (err) {
      console.error('Error durante el login', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="card p-4 shadow" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Ingresa a tu cuenta Q-NAVI</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit" className="btn btn-primary w-100">Ingresar a mi cuenta</button>
      </form>
      <div className="text-center mt-3">
        <a href="#">¿Olvidaste tu contraseña? Recupérala aquí.</a>
      </div>
    </div>
  );
};

export default LoginForm;
