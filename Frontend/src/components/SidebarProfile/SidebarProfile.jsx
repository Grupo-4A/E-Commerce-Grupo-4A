// frontend/src/components/SidebarProfile/SidebarProfile.jsx
import React from "react";
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiTrendingUp, FiEdit, FiHeadphones, FiBarChart2, FiSettings } from "react-icons/fi"; // FiX ya no es necesario


import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/admin" }, // Ruta principal del panel
  { name: "Productos", icon: <FiBox />, path: "/admin/products" },
  { name: "Pedidos", icon: <FiShoppingCart />, path: "/admin/orders" },
  { name: "Clientes", icon: <FiUsers />, path: "/admin/customers" },
  { name: "Marketing", icon: <FiTrendingUp />, path: "/admin/marketing" },
  { name: "Contenido", icon: <FiEdit />, path: "/admin/content" },
  { name: "Soporte", icon: <FiHeadphones />, path: "/admin/support" },
  { name: "Reportes", icon: <FiBarChart2 />, path: "/admin/reports" },
 
];

// Ya no recibe props 'isOpen' ni 'onClose'
const SidebarProfile = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // onClose() ya no es necesario aquí
  };

  return (
    // Se elimina el div de overlay para móviles, ya que la sidebar no se abre/cierra
    // <div
    //   className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
    //     isOpen ? "block" : "hidden"
    //   }`}
    //   onClick={onClose}
    // ></div>

    // La sidebar principal: siempre fija y visible
    <div
      // Se eliminan las clases condicionales de transformación, ya que siempre estará en translate-x-0
      // Se eliminan las transiciones también si no hay animación de entrada/salida
      className="fixed top-0 left-0 h-full w-64 bg-grisOscuro border-r border-gray-200 z-30 md:z-10"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 h-16">
        <h2 className="text-xl font-bold">Logo</h2>
        {/* Se elimina el botón de cierre FiX */}
        {/* <button
          className="bg-transparent border-none text-xl cursor-pointer flex items-center justify-center p-1 rounded-md hover:bg-grisClaro transition-colors"
          onClick={onClose}
        >
          <FiX />
        </button> */}
      </div>

      <nav className="p-4">
        {LinkItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center p-3 text-blanco hover:bg-slate-500 transition-colors rounded-md w-full text-left cursor-pointer"
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