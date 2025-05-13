import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import './Descriptionproduction. module.css';

const ProductCard = ({ product = {} }) => {
  const {
    name = "Memoria Ram Micron Crucial SODIMM CT16G4SFRA32A 1 16 GB Color Verde",
    price = 136900,
    rating = 0,
    currency = "$",
    isFavorite = false
  } = product;

  // Función para renderizar las estrellas
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'star-filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Función para formatear el precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
  };

  return (
    <div className="product-card">
      {/* Botón de favorito */}
      <button className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}>
        <Heart size={24} />
      </button>

      {/* Título del producto */}
      <h2 className="product-title">{name}</h2>

      {/* Calificación con estrellas */}
      <div className="rating-container">
        {renderStars()}
      </div>

      {/* Precio */}
      <div className="price-section">
        <p className="price-label">Precio</p>
        <p className="price-value">
          {currency}{formatPrice(price)}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="action-buttons">
        <button className="add-to-cart-btn">
          <ShoppingCart size={20} />
          Agregar
        </button>
        <button className="buy-now-btn">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;