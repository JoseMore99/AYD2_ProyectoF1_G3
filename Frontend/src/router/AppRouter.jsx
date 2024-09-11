import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Principal from '../views/Principal';
import UserProfile from '../views/UserProfile';

export const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/profile" element={<UserProfile />} />  {/* Nueva ruta para el perfil de usuario */}
        </Routes>
      </BrowserRouter>
    );
  };