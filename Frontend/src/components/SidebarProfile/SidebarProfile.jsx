// frontend/src/components/SidebarProfile/SidebarProfile.jsx
import React from "react";
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiTrendingUp, FiEdit, FiHeadphones, FiBarChart2 } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const LinkItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/admin" },
  { name: "Productos", icon: <FiBox />, path: "/admin/products" },
  { name: "Pedidos", icon: <FiShoppingCart />, path: "/admin/orders" },
  { name: "Clientes", icon: <FiUsers />, path: "/admin/customers" },
  { name: "Marketing", icon: <FiTrendingUp />, path: "/admin/marketing" },
  { name: "Contenido", icon: <FiEdit />, path: "/admin/content" },
  { name: "Soporte", icon: <FiHeadphones />, path: "/admin/support" },
  { name: "Reportes", icon: <FiBarChart2 />, path: "/admin/reports" },
];

const SidebarProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-grisOscuro border-r border-gray-200 z-40 overflow-y-auto">
     

      <nav className="p-4">
        {LinkItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center p-3 transition-colors rounded-md w-full text-left cursor-pointer mb-2 ${
              isActive(item.path)
                ? 'bg-azulClaro text-grisOscuro font-medium'
                : 'text-blanco hover:bg-slate-700 hover:text-azulClaro'
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <span className="mr-3 text-xl flex items-center">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SidebarProfile;