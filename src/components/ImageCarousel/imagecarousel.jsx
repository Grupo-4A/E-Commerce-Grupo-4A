import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './module.imagencarousel.css';

const ImageCarousel = () => {
  const images = [
    {
      id: 1,
      src: "/api/placeholder/600/400",
      alt: "Imagen 1",
      title: "Primera imagen"
    },
    {
      id: 2,
      src: "/api/placeholder/600/400",
      alt: "Imagen 2",
      title: "Segunda imagen"
    },
    {
      id: 3,
      src: "/api/placeholder/600/400",
      alt: "Imagen 3",
      title: "Tercera imagen"
    },
    {
      id: 4,
      src: "/api/placeholder/600/400",
      alt: "Imagen 4",
      title: "Cuarta imagen"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        {/* Lado izquierdo - Carrusel de imágenes */}
        <div className="image-gallery-section">
          <div className="gallery-container">
            <h2 className="gallery-title">Galería de Imágenes</h2>
            
            {/* Imagen principal */}
            <div className="image-main-container">
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className="main-image"
              />
              
              {/* Controles de navegación sobre la imagen */}
              <button
                onClick={prevImage}
                className="nav-button nav-left"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="nav-button nav-right"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Título de la imagen actual */}
              <div className="image-title-overlay">
                <h3 className="image-title">
                  {images[currentImageIndex].title}
                </h3>
              </div>
            </div>
            
            {/* Indicadores de puntos */}
            <div className="dots-container">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`dot ${index === currentImageIndex ? 'dot-active' : ''}`}
                />
              ))}
            </div>
            
            
          </div>
        </div>

        {/* Lado derecho - Contenedor vacío */}
        <div className="empty-container">
          {/* Contenedor vacío como el de información */}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;