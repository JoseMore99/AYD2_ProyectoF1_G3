import React from 'react';
import ProfileActionCard from './ProfileActionCard';
import ButtonNewTrip from './ButtonNewTrip';

function DriverDashboard() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Dashboard del Conductor</h2>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap justify-content-center">
          <ProfileActionCard iconClass="bi-pencil-square" title="Modifica tu perfil" description="Actualiza tu información personal" route="/modifica-perfil" />
          <ProfileActionCard iconClass="bi-star" title="Califica tu viaje" description="Evalúa tu experiencia" route="/califica-viaje" />
          <ProfileActionCard iconClass="bi-wallet2" title="Método de pago" description="Agrega o edita métodos de pago" route="/metodo-pago" />
          <ProfileActionCard iconClass="bi-exclamation-circle" title="Reporta inconveniente" description="Informa sobre un problema" route="/reporta-inconveniente" />
          <ProfileActionCard iconClass="bi-x-circle" title="Cancela viaje" description="Cancela un viaje próximo" route="/cancelar-viaje" />
          <ProfileActionCard iconClass="bi-cash" title="Ganancias" description="Consulta tus ganancias" route="/ganancias" />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <ButtonNewTrip iconClass="bi-car-front" cardText="Inicia nuevo viaje" buttonText="Nuevo viaje" redirectTo="/nuevo-viaje" />
      </div>
    </div>
  );
}

export default DriverDashboard;
