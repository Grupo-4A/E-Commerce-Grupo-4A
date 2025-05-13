import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Componente que recibe una lista de productos destacados como prop
const FeaturedProducts = ({ products }) => {
  // Hook de navegación para redireccionar a otras rutas
  const navigate = useNavigate();

  return (
    // Contenedor general con estilo oscuro y bordes redondeados
    <div className="bg-gray-800 flex flex-col items-center m-8 p-8 rounded-[30px]">
      
      {/* Encabezado */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Productos Destacados
        </h2>
      </div>

      {/* Contenedor de tarjetas de productos */}
      <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
          <div
            key={product.id} // Clave única para cada producto
            className="flex flex-col gap-[5px] overflow-hidden bg-gray-100 rounded-[30px_15px] max-w-[200px] p-[10px] max-h-[460px] shadow-[0_6px_8px_rgba(15,15,15,0.5)] transition-transform duration-200 ease-in-out hover:scale-105"
          >
            {/* Imagen del producto */}
            <img
              className="w-full h-[150px] object-cover rounded-[15px]"
              src={product.image}
              alt={product.name}
            />

            {/* Información del producto */}
            <div className="flex flex-col gap-0.5 p-[10px_5px] max-w-[160px]">
              <h3 className="mt-[5px] text-sm font-bold mb-[5px]">
                {product.name}
              </h3>

              {/* Descripción */}
              <p className="mt-[5px] text-xs mb-[10px] break-words whitespace-normal overflow-wrap-break-word">
                {product.description}
              </p>

              {/* Precio */}
              <p className="text-lg font-bold mt-[5px] text-right text-blue-900">
                ${product.price}
              </p>
            </div>

            {/* Icono y botón de compra */}
            <div className="flex gap-0.5 justify-end p-[10px_5px] mt-[5px]">
              {/* Icono de carrito */}
              <FiShoppingCart size="25px" className="text-emerald-500 cursor-pointer" />
              {/* Botón de compra */}
              <button
                className="bg-emerald-500 text-white border-none p-[8px_12px] rounded-[10px] cursor-pointer text-sm transition-colors duration-300 hover:bg-emerald-600"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para ver todos los productos, redirige a la ruta '/categorias' */}
      <button
        className="mt-10 bg-blue-400 text-white rounded-[10px] p-[12px_24px] text-base transition-colors duration-300 hover:bg-blue-600"
        onClick={() => navigate("/categorias")}
      >
        Ver todos los productos
      </button>
    </div>
  );
};

export default FeaturedProducts;
