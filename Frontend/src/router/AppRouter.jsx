import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Principal from '../views/Principal';
import UserProfile from '../views/UserProfile';
import DriverProfile from '../views/DriverProfile';
import AsistenProfile from '../views/AsistenProfile';
import AdminProfile from '../views/AdminProfile';
import PrivateRoute from './PrivateRoute';
import ReportarProblema from '../views/user/ReportaProblema';
import DriverApplicationForm from '../components/DriverApplicationForm';
import JobApplicationList from '../components/JobApplicationList';
import SolicitudesConductor from '../components/SolicitudesConductor';
import SolicitudDetalles from '../components/SolicitudDetalles'
import NuevoViaje from '../components/NuevoViaje';
import TripList from '../components/TripList';
import UserTripList from '../components/UserTripList';
import VerInfoUser from '../views/driver/VerInfoUser';
import FinalizarViaje from '../components/FinalizarViaje';
import BajaUsuario from '../components/BajaUsuario';
import ReportarProblemaDriver from '../views/driver/ReportaProblema';
import AsistenVerConductores from '../components/AsistenVerConductores'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />

        <Route path="/profile" element={
          <PrivateRoute role="Usuario">
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/reporta-inconveniente" element={
          <PrivateRoute role="Usuario">
            <ReportarProblema />
          </PrivateRoute>
        } />

        <Route path="/user/solicitar-empleo" element={
          <PrivateRoute role="Usuario">
            <DriverApplicationForm />
          </PrivateRoute>
        } />

        <Route path="/user/nuevo-viaje" element={
          <PrivateRoute role="Usuario">
            <NuevoViaje />
          </PrivateRoute>
        } />

        <Route path="/user/ver-solicitudes" element={
          <PrivateRoute role="Usuario">
            <JobApplicationList />
          </PrivateRoute>
        } />

        <Route path="/user/ver-viajes" element={
          <PrivateRoute role="Usuario">
            <UserTripList />
          </PrivateRoute>
        } />

        <Route path="/get-info-user" element={
          <PrivateRoute role="Conductor">
            <VerInfoUser />
          </PrivateRoute>
        } />

        <Route path="/driver" element={
          <PrivateRoute role="Conductor">
            <DriverProfile />
          </PrivateRoute>
        } />

        <Route path="/driver/nuevo-viaje" element={
          <PrivateRoute role="Conductor">
            <TripList />
          </PrivateRoute>
        } />
        
        <Route path="/driver/finalizar-viaje" element={
          <PrivateRoute role="Conductor">
            <FinalizarViaje />
          </PrivateRoute>
        } />
        <Route path="/driver/reportar" element={
          <PrivateRoute role="Conductor">
            <ReportarProblemaDriver />
          </PrivateRoute>
        } />


        <Route path="/asistente" element={
          <PrivateRoute role="Asistente">
            <AsistenProfile />
          </PrivateRoute>
        } />

        <Route path="/ver-solicitudes" element={
          <PrivateRoute role="Asistente">
            <SolicitudesConductor />
          </PrivateRoute>
        } />

        {/* Nueva ruta para ver los detalles de una solicitud */}
        <Route path="/solicitudes/:id" element={
          <PrivateRoute role="Asistente">
            <SolicitudDetalles />
          </PrivateRoute>
        } />

        {/* Ruta para bajas de usuario con rol Asistente */}
        <Route path="/asistente/baja-usuario" element={
          <PrivateRoute role="Asistente">
            <BajaUsuario />
          </PrivateRoute>
        }/>

        <Route path="/asistente/VerConductores" element={
          <PrivateRoute role="Asistente">
            <AsistenVerConductores />
          </PrivateRoute>
        }/>

        <Route path="/admin" element={
          <PrivateRoute role="Administrador">
            <AdminProfile />
          </PrivateRoute>
        } />

        {/* Ruta "catch-all" para redirigir a la página principal si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" />} />


      </Routes>
    </BrowserRouter>
  );
};
