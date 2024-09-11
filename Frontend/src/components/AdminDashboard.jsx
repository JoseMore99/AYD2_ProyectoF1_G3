import React from 'react';
import ProfileActionCard from './ProfileActionCard';
import ButtonNewTrip from './ButtonNewTrip';

function AdminDashboard() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard del Administrador</h2>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          <ProfileActionCard iconClass="bi-file-earmark-text" title="Generar reportes" description="Crea y descarga reportes" route="/generar-reportes" />
          <ProfileActionCard iconClass="bi-star" title="Calificar tu viaje" description="Evalúa tu experiencia" route="/califica-viaje" />
          <ProfileActionCard iconClass="bi-person-x" title="Dar de baja usuarios" description="Gestiona la baja de usuarios" route="/baja-usuarios" />
          <ProfileActionCard iconClass="bi-cash" title="Ganancias" description="Consulta las ganancias" route="/ganancias" />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <ButtonNewTrip iconClass="bi-file-earmark" cardText="Contrato de asistentes" buttonText="Solicitudes" redirectTo="/contrato-asistentes" />
      </div>
    </div>
  );
}

export default AdminDashboard;