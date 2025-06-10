import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiCheck, FiHeart, FiEye } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addedItems, setAddedItems] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);

  // Sincronizar con el carrito de localStorage
  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const isInCart = storedCart.some(item => item.id === product.id);
      if (isInCart) {
        setAddedItems(prev => new Set(prev).add(product.id));
      } else {
        setAddedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    handleCartUpdate(); // Inicializar estado

    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [product.id]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (isAdding || addedItems.has(product.id)) return;

    setIsAdding(true);
    
    try {
      // Crear nuevo item con cantidad inicial 1
      const newItem = { ...product, quantity: 1 };
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = [...storedCart, newItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Disparar evento para actualizar otros componentes
      window.dispatchEvent(new Event('cartUpdated'));
      
      setAddedItems(prev => new Set([...prev, product.id]));
      
      // Notificación flotante
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transform translate-x-full transition-transform duration-300 text-sm';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>${product.name} agregado al carrito</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.classList.remove('translate-x-full'), 100);
      setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);
      alert('Error al agregar el producto al carrito');
    } finally {
      setIsAdding(false);
    }
  };

  const handleCardClick = () => navigate(`/product/${product.id}`);
  const handleQuickView = (e) => { e.stopPropagation(); };
  const handleWishlist = (e) => { e.stopPropagation(); };

  const rating = Math.floor(Math.random() * 2) + 4;
  const renderStars = () =>
    Array.from({ length: 5 }, (_, i) =>
      i < rating ? <AiFillStar key={i} className="text-amber-400 text-xs" /> : <AiOutlineStar key={i} className="text-gray-300 text-xs" />
    );

  return (
    <div
      className="group relative w-[220px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1 cursor-pointer border border-gray-200 m-2"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          -{product.discount}%
        </div>
      )}

      <div className={`absolute top-2 right-2 flex flex-col gap-1 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>
        <button
          onClick={handleWishlist}
          className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors text-[12px] shadow"
        >
          <FiHeart />
        </button>
        <button
          onClick={handleQuickView}
          className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-500 transition-colors text-[12px] shadow"
        >
          <FiEye />
        </button>
      </div>

      <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-500"></div>
          </div>
        )}
        <img
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { e.target.style.display = 'none'; setImageLoaded(true); }}
        />
      </div>

      <div className="p-3 space-y-2">
        {product.category && (
          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-[2px] rounded-full font-medium">
            {product.category}
          </span>
        )}

        <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="text-[10px] text-gray-500">({Math.floor(Math.random() * 100) + 10})</span>
          </div>
          <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            En stock
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col leading-tight">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-gray-800">
              ${product.price?.toLocaleString() || '0'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-1 shadow hover:shadow-md transition-transform transform hover:scale-105 active:scale-95 ${
              isAdding ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={addedItems.has(product.id) ? 'Agregado al carrito' : 'Agregar al carrito'}
          >
            {addedItems.has(product.id) ? <FiCheck size={12} /> : <FiShoppingCart size={12} />}
            Agregar
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            Envío gratis
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            Garantía 1 año
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;