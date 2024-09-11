import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Principal from '../views/Principal';
import UserProfile from '../views/UserProfile';
import DriverProfile from '../views/DriverProfile';
import AsistenProfile from '../views/AsistenProfile';
import AdminProfile from '../views/AdminProfile';

export const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/profile" element={<UserProfile />} />  {/* Nueva ruta para el perfil de usuario */}
            <Route path="/driver" element={<DriverProfile />} />  {/* Nueva ruta para el perfil de usuario */}
            <Route path="/asistente" element={<AsistenProfile />} />  {/* Nueva ruta para el perfil de usuario */}
            <Route path="/admin" element={<AdminProfile />} />  {/* Nueva ruta para el perfil de usuario */}
        </Routes>
      </BrowserRouter>
    );
  };