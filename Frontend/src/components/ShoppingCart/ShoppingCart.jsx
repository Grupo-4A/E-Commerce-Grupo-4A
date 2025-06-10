import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log('🛒 Cargando carrito:', storedCart);
        
        if (Array.isArray(storedCart)) {
          setCartItems(storedCart);

          // Inicializar cantidades
          const initialQuantities = {};
          storedCart.forEach(item => {
            initialQuantities[item.id] = item.quantity || 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error("Error al cargar carrito:", error);
        setCartItems([]);
        setQuantities({});
      } finally {
        setLoading(false);
      }
    };

    // Cargar inicialmente
    loadCartFromLocalStorage();

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      console.log('🔄 Evento cartUpdated recibido');
      loadCartFromLocalStorage();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (!loading && cartItems.length > 0) {
      const updatedCart = cartItems.map(item => ({
        ...item,
        quantity: quantities[item.id] || item.quantity || 1
      }));
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('💾 Carrito guardado:', updatedCart);
    } else if (!loading && cartItems.length === 0) {
      localStorage.removeItem('cart');
      console.log('🗑️ Carrito vaciado');
    }
  }, [cartItems, quantities, loading]);

  // Actualizar cantidad
  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, currentQty + delta);
      console.log(`📊 Cantidad actualizada para ${id}: ${currentQty} → ${newQty}`);
      return { ...prev, [id]: newQty };
    });
  };

  // Eliminar producto
  const removeItem = (id) => {
    console.log(`🗑️ Eliminando producto ${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
    setQuantities(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // Vaciar carrito completo
  const clearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      setCartItems([]);
      setQuantities({});
      localStorage.removeItem('cart');
      console.log('🧹 Carrito vaciado completamente');
    }
  };

  // Cálculos
  const subtotal = cartItems.reduce((sum, item) => {
    const quantity = quantities[item.id] || item.quantity || 1;
    return sum + (item.price * quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-[30px] shadow-lg my-12">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-[30px] shadow-lg my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Carrito de Compras ({cartItems.length})
        </h2>
        {cartItems.length > 0 && (
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm underline"
          >
            Vaciar carrito
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-gray-500 mb-6">
            ¡Agrega algunos productos para comenzar a comprar!
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de productos */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-6 p-4 bg-white rounded-[20px] shadow-md"
              >
                {/* Imagen */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                </div>

                {/* Info del producto */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-500 mt-1">
                      Talla: {item.size}
                    </p>
                  )}
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    ${item.price?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    {item.shipping || 'Envío disponible'} ✓
                  </p>
                </div>

                {/* Controles */}
                <div className="flex flex-col items-center gap-3">
                  {/* Cantidad */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors"
                      disabled={(quantities[item.id] || item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">
                      {quantities[item.id] || item.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Precio total por producto */}
                  <p className="text-sm font-semibold text-gray-700">
                    ${((item.price || 0) * (quantities[item.id] || item.quantity || 1)).toFixed(2)}
                  </p>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar producto"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="w-full lg:w-80">
            <div className="bg-white p-6 rounded-[20px] shadow-md sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaShoppingCart className="text-gray-600" />
                Resumen del Pedido
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} productos)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg">
                Proceder al Checkout
              </button>
              
              <button 
                onClick={() => window.history.back()}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;