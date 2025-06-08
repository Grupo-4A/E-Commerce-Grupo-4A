import React from "react";

const Offer = ({ product }) => {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-white transition-transform duration-200 ease-in-out hover:scale-102">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="font-bold text-red-500">
          <span className="line-through text-gray-500 mr-2">
            ${product.oldPrice}
          </span>
          ${product.price}
        </p>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default Offer;