import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileActionCard from './ProfileActionCard';
import ButtonNewTrip from './ButtonNewTrip';

function UserDashboard() {
  const navigate = useNavigate();  // Inicializar el hook useNavigate

  const handleJobApplication = () => {
    navigate('/user/solicitar-empleo');  // Redirigir a la ruta del formulario de empleo
  };

  const handleViewJobApplications = () => {
    navigate('/user/ver-solicitudes');  // Redirigir a la ruta de ver solicitudes
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard del Usuario</h2>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          <ProfileActionCard iconClass="bi-pencil-square" title="Modificar tu perfil" description="Actualiza tu información personal" route="/modificar-perfil" />
          <ProfileActionCard iconClass="bi-star" title="Califica tu viaje" description="Evalúa tu experiencia" route="/califica-viaje" />
          <ProfileActionCard iconClass="bi-wallet2" title="Método de pago" description="Agrega o edita métodos de pago" route="/metodo-pago" />
          <ProfileActionCard iconClass="bi-exclamation-circle" title="Reporta inconveniente" description="Informa sobre un problema" route="/reporta-inconveniente" />
          <ProfileActionCard iconClass="bi-x-circle" title="Cancelar viaje" description="Cancela un viaje próximo" route="/cancelar-viaje" />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <ButtonNewTrip iconClass="bi-car-front" cardText="Solicita nuevo viaje" buttonText="Nuevo viaje" redirectTo="/user/nuevo-viaje" />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleJobApplication}>Solicitar Empleo como Conductor</button>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary" onClick={handleViewJobApplications}>Ver mis Solicitudes</button>
      </div>
    </div>
  );
}

export default UserDashboard;
