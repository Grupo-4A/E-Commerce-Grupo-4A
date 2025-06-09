// frontend/src/layouts/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile/NavbarProfile';
import SidebarProfile from '../components/SidebarProfile/SidebarProfile';

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar fijo en la parte superior */}
      <NavbarProfile />
      
      {/* Sidebar fijo a la izquierda */}
      <SidebarProfile />
      
      {/* Contenedor principal que toma en cuenta navbar y sidebar fijos */}
      <main className="fixed top-16 left-64 right-0 bottom-0 overflow-auto bg-gray-50">
        <div className="p-4 md:p-6 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;