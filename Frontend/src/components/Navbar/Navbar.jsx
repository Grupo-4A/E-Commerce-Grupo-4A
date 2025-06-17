import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    updateCartCount();
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
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
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mx-4 md:mx-8 my-4 font-sans">
      <nav className="flex w-full bg-gray-800 rounded-3xl px-3 py-2 md:py-1">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 md:h-10 cursor-pointer"
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          />
          <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto mt-4 md:mt-0`}>
          <div className="flex items-center bg-gray-200 rounded-full px-2 py-0.5 h-8 border border-gray-300 w-full md:w-auto">
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

          <ul className="flex flex-col md:flex-row list-none gap-2 md:gap-4 text-white cursor-pointer w-full md:w-auto">
            {[
              { path: "/", label: "Inicio" },
              { path: "/categorias", label: "Categorías" },
              { path: "/ofertas", label: "Ofertas" },
              { path: "/blog", label: "Blog" },
              { path: "/soporte", label: "Soporte" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  className="hover:text-blue-600 block py-2 md:py-0"
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="relative">
            <FiShoppingCart
              className="text-white text-xl cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => {
                navigate("/carrito");
                setIsMenuOpen(false);
              }}
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
        <button
          onClick={() => {
            navigate("/login");
            setIsMenuOpen(false);
          }}
          className="bg-blue-400 text-white rounded-full px-3 py-2 text-sm md:px-4 md:py-3 hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => {
            navigate("/login");
            setIsMenuOpen(false);
          }}
          className="bg-gray-800 text-white rounded-full px-3 py-2 text-sm md:px-4 md:py-3 hover:bg-gray-700 transition-colors"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};

export default Navbar;