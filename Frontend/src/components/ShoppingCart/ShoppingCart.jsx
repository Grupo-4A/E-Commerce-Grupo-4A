import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const ShoppingCart = () => {
  // Estado del carrito y cantidades por producto
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    const loadCartFromLocalStorage = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(storedCart);

        // Inicializar cantidades basado en los productos cargados
        const initialQuantities = {};
        storedCart.forEach(item => {
          initialQuantities[item.id] = item.quantity || 1; // Usa la cantidad guardada o 1 por defecto
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error al cargar el carrito de localStorage:", error);
        setCartItems([]);
        setQuantities({});
      }
    };

    // Cargar el carrito inicialmente
    loadCartFromLocalStorage();

    // Suscribirse al evento 'cartUpdated'
    window.addEventListener('cartUpdated', loadCartFromLocalStorage);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('cartUpdated', loadCartFromLocalStorage);
    };
  }, []); // El array vacío asegura que se ejecute solo al montar y desmontar

  // Actualizar localStorage cada vez que cartItems o quantities cambien
  useEffect(() => {
    // Si cartItems o quantities cambian, actualiza localStorage
    // Asegúrate de que este useEffect no cause un bucle infinito
    // guardando solo cuando los datos relevantes para el carrito cambien.
    if (cartItems.length > 0 || Object.keys(quantities).length > 0) {
        const updatedCartForStorage = cartItems.map(item => ({
            ...item,
            quantity: quantities[item.id] || 1 // Asegura que la cantidad se actualice en el objeto
        }));
        localStorage.setItem('cart', JSON.stringify(updatedCartForStorage));
    } else if (cartItems.length === 0 && Object.keys(quantities).length === 0) {
        // Si el carrito está vacío, limpia localStorage
        localStorage.removeItem('cart');
    }
  }, [cartItems, quantities]);


  // Actualizar cantidad
  const updateQuantity = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Eliminar producto del carrito
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setQuantities((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // Cálculos
  const subtotal = cartItems
    .reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0)
    .toFixed(2);
  const tax = (subtotal * 0.08).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-grisClaro rounded-[30px] shadow-lg my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Tu carrito de compras está vacío.
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Sección izquierda: productos */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-6 p-4 bg-white rounded-[20px] shadow-md"
              >
                {/* Imagen del producto */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-36 object-cover rounded-md"
                />

                {/* Info del producto */}
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="text-md font-bold text-gray-800">${item.price.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      item.inStock ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {item.shipping}{' '}
                    {item.inStock && <span className="text-green-600">✔</span>}
                  </p>
                </div>

                {/* Controles de cantidad y eliminación */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{quantities[item.id]}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ícono del carrito */}
          <div className="w-16">
            <FaShoppingCart className="w-16 h-16 text-gray-400" />
          </div>

          {/* Sección derecha: resumen */}
          <div className="w-1/4 bg-white p-6 rounded-[20px] shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping estimate</span>
                <span className="flex items-center gap-1">
                  $0.00 <span className="text-xs">?</span>
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax estimate</span>
                <span className="flex items-center gap-1">
                  ${tax} <span className="text-xs">?</span>
                </span>
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Order total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;