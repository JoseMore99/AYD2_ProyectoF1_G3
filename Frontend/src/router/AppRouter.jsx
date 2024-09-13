import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Principal from '../views/Principal';
import UserProfile from '../views/UserProfile';
import DriverProfile from '../views/DriverProfile';
import AsistenProfile from '../views/AsistenProfile';
import AdminProfile from '../views/AdminProfile';
import PrivateRoute from './PrivateRoute';

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

        <Route path="/admin" element={
          <PrivateRoute role="Administrador">
            <AdminProfile />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};
