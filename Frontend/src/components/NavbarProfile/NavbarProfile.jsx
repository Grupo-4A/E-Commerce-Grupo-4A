// frontend/src/components/NavbarProfile/NavbarProfile.jsx
import React, { useState, useEffect } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import Logo from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const NavbarProfile = ({ onOpenSidebar }) => { // ¡VERIFICA QUE RECIBE 'onOpenSidebar'!
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && event.target && !event.target.closest('.user-menu-dropdown-container')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-2 bg-grisOscuro border-b border-gray-200 h-16 z-20">
      <div className="flex items-center">
        <button
          className="bg-azulClaro border-none text-2xl cursor-pointer p-2 mr-2 flex items-center justify-center rounded-3xl hover:bg-gray-100 transition-colors"
          onClick={() => { // ¡AÑADIDO PARA DEBUG!
            console.log("DEBUG: Botón FiMenu clicado."); // ¡AÑADIDO PARA DEBUG!
            if (onOpenSidebar) { // ¡AÑADIDO PARA DEBUG! Verifica si la prop existe
              onOpenSidebar();
            } else {
              console.error("DEBUG: onOpenSidebar no es una función o no está definida."); // ¡AÑADIDO PARA DEBUG!
            }
          }}
        >
          <FiMenu />
        </button>
        <img
            src={Logo}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-azulClaro border-none text-2xl cursor-pointer p-2 flex items-center justify-center rounded-3xl hover:bg-gray-100 transition-colors">
          <FiBell />
        </button>

        <div className="relative flex items-center gap-2 cursor-pointer user-menu-dropdown-container">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex items-center"
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              alt="Avatar"
            />
            <FiChevronDown className="ml-1 bg-azulClaro rounded-md" />
          </div>

          {menuOpen && (
            <div className="absolute top-12 right-0 bg-grisOscuro border border-grisClaro rounded-lg shadow-lg w-48 z-30">
              <div className="text-blanco hover:bg-slate-500 transition-colors p-3 cursor-pointer">Perfil</div>
              <div className="text-blanco hover:bg-slate-500 transition-colors p-3 cursor-pointer">Configuración</div>
              <div className="border-t border-gray-200 my-1"></div>
              <div className="text-blanco hover:bg-slate-500 transition-colors p-3 cursor-pointer">Cerrar sesión</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarProfile;