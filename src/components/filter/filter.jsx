import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import "./filter.module.css";

// Componente principal de filtros
export default function SidebarFilter() {
  const [filters, setFilters] = useState({
    categories: [],
    price: { min: "", max: "" },
    brands: [],
    rating: null,
    availability: false,
  });
  
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true,
    availability: true
  });

  // Categorías de ejemplo
  const categories = [
    "Electrónicos", "Ropa", "Hogar", "Deportes", "Belleza", "Juguetes"
  ];
  
  // Marcas de ejemplo
  const brands = [
    "Samsung", "Apple", "Nike", "Adidas", "Sony", "LG", "Zara"
  ];

  // Maneja los cambios en las categorías
  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  // Maneja los cambios en las marcas
  const handleBrandChange = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  // Maneja los cambios en el precio
  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      price: {
        ...prev.price,
        [type]: value
      }
    }));
  };

  // Maneja los cambios en la clasificación
  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  // Maneja los cambios en la disponibilidad
  const handleAvailabilityChange = () => {
    setFilters(prev => ({
      ...prev,
      availability: !prev.availability
    }));
  };

  // Alternar la visibilidad de las secciones
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      price: { min: "", max: "" },
      brands: [],
      rating: null,
      availability: false,
    });
  };

  // Contar los filtros activos
  const activeFiltersCount = 
    filters.categories.length + 
    filters.brands.length + 
    (filters.price.min || filters.price.max ? 1 : 0) + 
    (filters.rating ? 1 : 0) + 
    (filters.availability ? 1 : 0);

  return (
    <div className="filter-container">
      {/* Filtro lateral */}
      <div className={`sidebar-filter ${isFilterVisible ? 'filter-visible' : 'filter-hidden'}`}>
        <div className="filter-header">
          <h2 className="filter-title">Filtros</h2>
          <button 
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="close-button"
          >
            <X size={20} />
          </button>
        </div>

        {activeFiltersCount > 0 && (
          <div className="active-filters-info">
            <div className="active-filters-header">
              <span className="active-filters-count">Filtros activos: {activeFiltersCount}</span>
              <button 
                onClick={clearAllFilters}
                className="clear-filters-button"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}

        {/* Sección de categorías */}
        <div className="filter-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('categories')}
          >
            <h3 className="section-title">Categorías</h3>
            {expandedSections.categories ? <ChevronUp size={16} className="section-icon" /> : <ChevronDown size={16} className="section-icon" />}
          </div>
          
          {expandedSections.categories && (
            <div className="section-content">
              {categories.map(category => (
                <div key={category} className="option-item">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="option-checkbox"
                  />
                  <label htmlFor={`category-${category}`} className="option-label">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección de precio */}
        <div className="filter-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('price')}
          >
            <h3 className="section-title">Precio</h3>
            {expandedSections.price ? <ChevronUp size={16} className="section-icon" /> : <ChevronDown size={16} className="section-icon" />}
          </div>
          
          {expandedSections.price && (
            <div className="section-content">
              <div className="price-range">
                <div className="price-input-container">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.price.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="price-input"
                  />
                </div>
                <div className="price-input-container">
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.price.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="price-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección de marcas */}
        <div className="filter-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('brands')}
          >
            <h3 className="section-title">Marcas</h3>
            {expandedSections.brands ? <ChevronUp size={16} className="section-icon" /> : <ChevronDown size={16} className="section-icon" />}
          </div>
          
          {expandedSections.brands && (
            <div className="section-content brands-list">
              {brands.map(brand => (
                <div key={brand} className="option-item">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="option-checkbox"
                  />
                  <label htmlFor={`brand-${brand}`} className="option-label">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección de calificación */}
        <div className="filter-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('rating')}
          >
            <h3 className="section-title">Calificación</h3>
            {expandedSections.rating ? <ChevronUp size={16} className="section-icon" /> : <ChevronDown size={16} className="section-icon" />}
          </div>
          
          {expandedSections.rating && (
            <div className="section-content">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="option-item">
                  <input
                    type="radio"
                    id={`rating-${star}`}
                    name="rating"
                    checked={filters.rating === star}
                    onChange={() => handleRatingChange(star)}
                    className="option-checkbox"
                  />
                  <label htmlFor={`rating-${star}`} className="option-label rating-label">
                    {star} {star === 1 ? 'estrella' : 'estrellas'} o más
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección de disponibilidad */}
        <div className="filter-section last-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('availability')}
          >
            <h3 className="section-title">Disponibilidad</h3>
            {expandedSections.availability ? <ChevronUp size={16} className="section-icon" /> : <ChevronDown size={16} className="section-icon" />}
          </div>
          
          {expandedSections.availability && (
            <div className="section-content">
              <div className="option-item">
                <input
                  type="checkbox"
                  id="in-stock"
                  checked={filters.availability}
                  onChange={handleAvailabilityChange}
                  className="option-checkbox"
                />
                <label htmlFor="in-stock" className="option-label">
                  En stock
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Botón para aplicar filtros en móvil */}
        <div className="mobile-apply-button">
          <button className="apply-filters-button">
            Aplicar filtros
          </button>
        </div>
      </div>

      {/* Botón para mostrar filtros en móvil cuando están ocultos */}
      {!isFilterVisible && (
        <button 
          onClick={() => setIsFilterVisible(true)} 
          className="show-filters-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
      )}

      {/* Área de contenido principal (representación) */}
      <div className="main-content">
        <div className="products-area">
          <h2 className="products-title">Área de productos</h2>
          <p className="products-placeholder">Aquí se mostrarían los productos filtrados</p>
          
          {/* Mostrar filtros activos */}
          {activeFiltersCount > 0 && (
            <div className="applied-filters-container">
              <h3 className="applied-filters-title">Filtros aplicados:</h3>
              <div className="applied-filters-list">
                {filters.categories.map(category => (
                  <span key={category} className="filter-tag category-tag">
                    {category} <button onClick={() => handleCategoryChange(category)} className="remove-tag">×</button>
                  </span>
                ))}
                
                {filters.brands.map(brand => (
                  <span key={brand} className="filter-tag brand-tag">
                    {brand} <button onClick={() => handleBrandChange(brand)} className="remove-tag">×</button>
                  </span>
                ))}
                
                {(filters.price.min || filters.price.max) && (
                  <span className="filter-tag price-tag">
                    Precio: {filters.price.min || '0'} - {filters.price.max || '∞'}
                  </span>
                )}
                
                {filters.rating && (
                  <span className="filter-tag rating-tag">
                    {filters.rating}+ estrellas
                  </span>
                )}
                
                {filters.availability && (
                  <span className="filter-tag availability-tag">
                    En stock
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}