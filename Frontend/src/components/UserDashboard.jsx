import React from 'react';
import ProfileActionCard from './ProfileActionCard';
import ButtonNewTrip from './ButtonNewTrip';

function UserDashboard() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Crea una cuenta en Q-NAVI</h2>
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
        <ButtonNewTrip />
      </div>
    </div>
  );
}

export default UserDashboard;
