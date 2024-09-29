import React from 'react';
import ProfileActionCard from './ProfileActionCard';
import ButtonNewTrip from './ButtonNewTrip';

function AsistenDashboard() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard del Asistente</h2>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          <ProfileActionCard iconClass="bi-file-earmark-text" title="Informes" description="Consulta y descarga informes" route="/informes" />
          <ProfileActionCard iconClass="bi-star" title="Califica tu viaje" description="Evalúa tu experiencia" route="/califica-viaje" />
          <ProfileActionCard iconClass="bi-file-earmark" title="Generar ofertas" description="Crea y administra ofertas" route="/generar-ofertas" />
          <ProfileActionCard iconClass="bi-eye" title="Ver solicitudes" description="Revisa y maneja solicitudes" route="/ver-solicitudes" />
          <ProfileActionCard iconClass="bi-person-x" title="Baja de usuario" description="Gestiona la baja de usuarios" route="/asistente/baja-usuario" />
          <ProfileActionCard iconClass="bi-person" title="Usuarios" description="Visualiza los Usuarios" route="/asistente/VerUsuarios" />
          <ProfileActionCard iconClass="bi-person" title="Conductores" description="Visualiza los Conductores" route="/asistente/VerConductores" />
          <ProfileActionCard iconClass="bi-graph-up" title="Reportes" description="Genera y visualiza reportes" route="/reportes" />
        </div>
      </div>
      {
        /* <div className="d-flex justify-content-center mt-4">
        <ButtonNewTrip iconClass="bi-car-front" cardText="Aceptar solicitudes" buttonText="Solicitudes" redirectTo="/solicitudes" />
      </div> */
      }
      
    </div>
  );
}

export default AsistenDashboard;
