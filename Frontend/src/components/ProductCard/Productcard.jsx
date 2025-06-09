import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    alert(`${product.name} agregado al carrito!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="max-w-[250px] flex flex-col rounded-2xl overflow-hidden shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 bg-white m-2.5 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex text-yellow-400 text-sm">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p className="text-xl font-bold text-blue-900">
            ${product.price}
          </p>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 text-white rounded-xl cursor-pointer text-sm transition-colors duration-300 hover:bg-emerald-700 flex items-center justify-center px-3 py-2 font-medium"
        >
          <FiShoppingCart className="mr-2" size="16px" />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;