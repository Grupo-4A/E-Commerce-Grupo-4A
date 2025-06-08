import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <div
      className="max-w-[250px] flex flex-wrap gap-1.25 rounded-2xl overflow-hidden max-h-[460px] shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 bg-gray-200 m-2.5"
    >
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-2 gap-2 max-w-[260px]">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-700 break-words">
          {product.description}
        </p>
        <div className="flex justify-end text-yellow-400 text-xl pr-2">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <p className="text-2xl font-medium text-blue-900 text-right">
          ${product.price}
        </p>
      </div>
      <div className="flex gap-2 mt-1.25 justify-end p-2.5">
        <button
          className="bg-emerald-500 text-white rounded-xl cursor-pointer text-sm transition-colors duration-300 hover:bg-emerald-700 flex items-center px-3 py-1"
        >
          <FiShoppingCart className="mr-1" /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;