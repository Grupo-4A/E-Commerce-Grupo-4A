import React, { useState } from 'react';
import { FiShoppingCart, FiCheck } from "react-icons/fi";

const FeaturedProducts = ({ products, onAddToCart }) => {
  // Simular navegación para el artifact
  const navigate = (path) => {
    console.log(`Navegando a: ${path}`);
  };
  const [addedItems, setAddedItems] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    
    if (isAdding) return; // Prevenir clicks múltiples
    
    setIsAdding(true);
    
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      }
      
      // Mostrar feedback visual
      setAddedItems(prev => new Set([...prev, product.id]));
      
      // Quitar el feedback después de 2 segundos
      setTimeout(() => {
        setAddedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);
      
      console.log(`✅ ${product.name} agregado al carrito`);
      
    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);
      alert('Error al agregar el producto al carrito');
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async (product, e) => {
    e.stopPropagation();
    
    try {
      // Primero agregar al carrito
      if (onAddToCart) {
        await onAddToCart(product);
      }
      
      // Pequeña pausa para asegurar que se guarde
      setTimeout(() => {
        navigate(`/product/${product.id}`);
      }, 100);
      
    } catch (error) {
      console.error('❌ Error en compra directa:', error);
      alert('Error al procesar la compra');
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-800 flex flex-col items-center m-8 p-8 rounded-[30px]">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📦</div>
          <p>No hay productos destacados disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 flex flex-col items-center m-8 p-8 rounded-[30px]">
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Productos Destacados
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Descubre nuestros productos más populares
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => {
          const isAdded = addedItems.has(product.id);
          
          return (
            <div
              key={product.id}
              className="group flex flex-col gap-2 overflow-hidden bg-gray-100 rounded-[30px_15px] max-w-[220px] p-4 shadow-[0_6px_12px_rgba(15,15,15,0.5)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_8px_16px_rgba(15,15,15,0.7)] cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Imagen del producto */}
              <div className="relative overflow-hidden rounded-[15px]">
                <img
                  className="w-full h-[160px] object-cover transition-transform duration-300 group-hover:scale-110"
                  src={product.image || "https://via.placeholder.com/300x160"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x160?text=Imagen+no+encontrada";
                  }}
                />
                {/* Badge de precio */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                  <span className="text-sm font-bold text-blue-900">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>

              {/* Información del producto */}
              <div className="flex flex-col gap-2 p-2 flex-1">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                  {product.name || 'Producto sin nombre'}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 flex-1">
                  {product.description || 'Sin descripción disponible'}
                </p>

                {/* Información adicional */}
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                  <span>En stock</span>
                  <span>Envío gratis</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2 justify-between items-center p-2 mt-2">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={isAdding}
                  className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                    isAdded 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-emerald-500 hover:bg-emerald-50'
                  } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={isAdded ? 'Agregado al carrito' : 'Agregar al carrito'}
                >
                  {isAdded ? (
                    <FiCheck size="20px" />
                  ) : (
                    <FiShoppingCart size="20px" />
                  )}
                </button>
                
                <button
                  onClick={(e) => handleBuyNow(product, e)}
                  disabled={isAdding}
                  className={`bg-emerald-500 text-white border-none px-4 py-2 rounded-[10px] cursor-pointer text-sm transition-all duration-300 hover:bg-emerald-600 hover:shadow-md flex-1 ${
                    isAdding ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAdding ? 'Agregando...' : 'Comprar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mt-10 bg-blue-500 text-white rounded-[10px] px-6 py-3 text-base transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
        onClick={() => navigate("/categorias")}
      >
        Ver todos los productos
      </button>
    </div>
  );
};

export default FeaturedProducts;