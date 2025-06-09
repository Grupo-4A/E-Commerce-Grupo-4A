import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Función para actualizar el contador del carrito
  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemsCount(totalItems);
    } catch (error) {
      console.error('Error al leer el carrito:', error);
      setCartItemsCount(0);
    }
  };

  useEffect(() => {
    // Actualizar contador al cargar el componente
    updateCartCount();
    
    // Escuchar eventos de actualización del carrito
    const handleCartUpdate = () => {
      updateCartCount();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate); // Para cambios desde otras pestañas
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchTerm.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      } else {
        navigate(`/products`); 
      }
    }
  };

  return (
    <div className="flex justify-between items-center mx-8 my-4 font-sans">
      <nav className="flex bg-gray-800 rounded-3xl px-3 py-1">
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex items-center bg-gray-200 rounded-full px-2 py-0.5 h-8 border border-gray-300">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none w-full text-sm px-2 h-full"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
            <FiSearch
              className="text-gray-800 ml-1 cursor-pointer"
              onClick={handleSearchSubmit}
            />
          </div>

          <ul className="flex list-none gap-4 ml-3 text-white cursor-pointer">
            <li><a className="hover:text-blue-600" onClick={() => navigate("/")}>Inicio</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/categorias")}>Categorías</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/ofertas")}>Ofertas</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/blog")}>Blog</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/soporte")}>Soporte</a></li>
          </ul>

          {/* Icono del carrito con contador */}
          <div className="relative">
            <FiShoppingCart
              className="text-white text-xl ml-5 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => navigate("/carrito")}
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="flex gap-2 ml-20">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-400 text-white rounded-full px-4 py-3 hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-800 text-white rounded-full px-4 py-3 hover:bg-gray-700 transition-colors"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};

export default Navbar;