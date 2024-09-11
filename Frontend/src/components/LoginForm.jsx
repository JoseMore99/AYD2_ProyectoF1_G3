import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logica de login
    console.log('Correo:', email, 'Contraseña:', password);
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
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar a mi cuenta</button>
      </form>
      <div className="text-center mt-3">
        <a href="#">¿Olvidaste tu contraseña? Recupérala aquí.</a>
      </div>
    </div>
  );
}

export default LoginForm;
