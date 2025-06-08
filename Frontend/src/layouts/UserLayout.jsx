// frontend/src/layouts/UserLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile/NavbarProfile'; 
import SidebarProfile from '../components/SidebarProfile/SidebarProfile'; 

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    console.log("DEBUG: handleOpenSidebar llamada. isSidebarOpen:", isSidebarOpen); 
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    console.log("DEBUG: handleCloseSidebar llamada. isSidebarOpen:", isSidebarOpen);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-azulProfundo">
      <SidebarProfile isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavbarProfile onOpenSidebar={handleOpenSidebar} /> 
        <main className="flex-1 overflow-y-auto p-4 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;