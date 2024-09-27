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
import JobApplicationList  from '../components/JobApplicationList';
import SolicitudesConductor from '../components/SolicitudesConductor';
import SolicitudDetalles from '../components/SolicitudDetalles'
import NuevoViaje from '../components/NuevoViaje';

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
        <Route path="/reporta-inconveniente" element={<ReportarProblema />} />
         
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
            <JobApplicationList  />
          </PrivateRoute>
        } />

        <Route path="/driver" element={
          <PrivateRoute role="Conductor">
            <DriverProfile />
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
