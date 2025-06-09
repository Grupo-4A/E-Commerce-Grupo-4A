// frontend/src/layouts/UserLayout.jsx
import React from 'react'; // Eliminamos useState
import { Outlet } from 'react-router-dom';
import NavbarProfile from '../components/NavbarProfile/NavbarProfile';
import SidebarProfile from '../components/SidebarProfile/SidebarProfile';

const UserLayout = () => {
 

  return (
  
    <div className="relative h-screen bg-gray-100">

     
      <SidebarProfile />

      
      <NavbarProfile />

      <div className="
        absolute
        top-16   /* ALTURA de la Navbar (64px) */
        left-64  /* ANCHO del Sidebar (256px) */
        right-0
        bottom-0
        flex flex-col /* Para que <main> pueda usar flex-1 */
        overflow-y-auto
        bg-gray-50
      ">
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;