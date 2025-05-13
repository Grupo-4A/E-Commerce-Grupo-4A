// Importación de íconos desde react-icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6"; // Ícono de X (Twitter nuevo logo)

const Footer = () => {
  return (
    // Pie de página con fondo oscuro, texto claro y bordes redondeados
    <footer className="bg-gray-800 text-gray-100 p-10 rounded-3xl">

      {/* Contenedor principal de las secciones, centrado y con separación */}
      <div className="flex flex-wrap justify-around gap-5 max-w-6xl mx-auto">
        
        {/* Sección de Información general */}
        <div className="flex-1 min-w-[250px] max-w-[300px]">
          <h2 className="text-xl mb-3 text-white">PandoraTech</h2>
          <p className="text-sm leading-6">
            Tu ecommerce de confianza con los mejores productos y envíos rápidos. Garantía y calidad aseguradas.
          </p>
        </div>

        {/* Sección de Enlaces rápidos de navegación */}
        <div className="flex-1 min-w-[250px] max-w-[300px]">
          <h2 className="text-xl mb-3 text-white">Enlaces Rápidos</h2>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a href="/about" className="text-gray-300 no-underline transition-colors duration-300 hover:text-blue-500">
                Sobre Nosotros
              </a>
            </li>
            <li className="mb-2">
              <a href="/shop" className="text-gray-300 no-underline transition-colors duration-300 hover:text-blue-500">
                Tienda
              </a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="text-gray-300 no-underline transition-colors duration-300 hover:text-blue-500">
                Contacto
              </a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="text-gray-300 no-underline transition-colors duration-300 hover:text-blue-500">
                Preguntas Frecuentes
              </a>
            </li>
          </ul>
        </div>

        {/* Sección de contacto */}
        <div className="flex-1 min-w-[250px] max-w-[300px]">
          <h2 className="text-xl mb-3 text-white">Contacto</h2>
          <p className="text-sm leading-6">📍 Calle 123, Ciudad</p>
          <p className="text-sm leading-6">📞 +123 456 7890</p>
          <p className="text-sm leading-6">📧 info@ecommerce.com</p>

          {/* Íconos de redes sociales */}
          <div className="flex justify-center gap-4 mt-3">
            <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-blue-500">
              <FaX />
            </a>
            <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-white text-xl transition-colors duration-300 hover:text-blue-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior con derechos de autor y año actual */}
      <div className="mt-5 text-xs border-t border-gray-700 pt-3 text-center">
        © {new Date().getFullYear()} Ecommerce. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
