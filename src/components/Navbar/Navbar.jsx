import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mx-8 my-4 font-sans">
      {/* Contenedor izquierdo: Logo + Buscador + Links + Carrito */}
      <nav className="flex bg-gray-800 rounded-3xl px-3 py-1">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="h-10" />

          {/* Buscador */}
          <div className="flex items-center bg-gray-200 rounded-full px-2 py-0.5 h-8 border border-gray-300">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none w-full text-sm px-2 h-full"
            />
            <FiSearch className="text-gray-800 ml-1" />
          </div>

          {/* Enlaces de navegación */}
          <ul className="flex list-none gap-4 ml-3 text-white cursor-pointer">
            <li><a className="hover:text-blue-600" onClick={() => navigate("/")}>Inicio</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/categorias")}>Categorías</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/ofertas")}>Ofertas</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/blog")}>Blog</a></li>
            <li><a className="hover:text-blue-600" onClick={() => navigate("/soporte")}>Soporte</a></li>
          </ul>

          {/* Icono de carrito */}
          <FiShoppingCart
            className="text-white text-xl ml-5 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/carrito")}
          />
        </div>
      </nav>

      {/* Botones de autenticación */}
      <div className="flex gap-2 ml-20">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-400 text-white rounded-full px-4 py-3 hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-800 text-white rounded-full px-4 py-3 hover:bg-gray-700"
        >
          Regístrate
        </button>
      </div>
    </div>
  );
};

export default Navbar;
