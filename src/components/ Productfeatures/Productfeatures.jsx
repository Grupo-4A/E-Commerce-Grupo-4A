import React from 'react';
import styles from './Productfeatures.module.css'; // Import the CSS module

const ProductDescription = ({ product = {} }) => {
  const {
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    features = [
      "Memoria RAM DDR4",
      "Velocidad de 3200 MHz",
      "Capacidad de 16 GB",
      "Tipo SODIMM",
      "Color Verde"
    ],
    specifications = {
      "Marca": "Micron",
      "Serie": "Crucial",
      "Modelo": "CT16G4SFRA32A",
      "Tipo": "DDR4 SODIMM",
      "Capacidad": "16 GB",
      "Velocidad": "3200 MHz",
      "Latencia": "CL22",
      "Voltaje": "1.2V"
    }
  } = product;

  return (
    <div className={styles['product-description-wrapper']}> {/* Apply the wrapper class */}
      <div className={styles['product-description']}>
        <div className={styles['product-header']}>
          <h1 className={styles['header-title']}>Descripción del Producto</h1>
        </div>

        <div className={styles['description-container']}>
          {/* Descripción General */}
          <div className={styles['description-section']}>
            <h2 className={styles['section-title']}>Descripción General</h2>
            <p className={styles['description-text']}>{description}</p>
          </div>

          {/* Características Principales */}
          <div className={styles['description-section']}>
            <h2 className={styles['section-title']}>Características Principales</h2>
            <div className={styles['features-grid']}>
              {features.map((feature, index) => (
                <div key={index} className={styles['feature-card']}>
                  <div className={styles['feature-icon']}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className={styles['feature-text']}>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Especificaciones Técnicas */}
          <div className={styles['description-section']}>
            <h2 className={styles['section-title']}>Especificaciones Técnicas</h2>
            <div className={styles['specs-container']}>
              <div className={styles['specs-grid']}>
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className={styles['spec-row']}>
                    <span className={styles['spec-label']}>{key}</span>
                    <span className={styles['spec-value']}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;