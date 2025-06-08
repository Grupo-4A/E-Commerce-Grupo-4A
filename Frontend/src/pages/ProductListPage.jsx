import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom'; // Importa useLocation
import ProductCard from "../components/ProductCard/Productcard.jsx";
import Filters from "../components/Filters/Filters.jsx";
import { getAllProducts } from '../services/productService.js';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 12;

  // Usa useLocation para obtener los parámetros de la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlSearchTerm = queryParams.get('search') || ''; // Obtiene el término de búsqueda de la URL

  // Estado para los filtros (se mantiene igual)
  const [filters, setFilters] = useState({
    brandIds: [],
    minPrice: null,
    maxPrice: null,
    statusIds: [],
    categoryIds: [],
    compatibilityIds: [],
    ramValues: [],
    diskSpaceValues: [],
    licenseIds: [],
  });

  // Función para cargar productos con los filtros, paginación y búsqueda
  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Pasa el término de búsqueda de la URL directamente a getAllProducts
      const responseData = await getAllProducts(currentPage, productsPerPage, filters, urlSearchTerm);
      setProducts(responseData.content || []);
      setTotalPages(responseData.totalPages || 0);
    } catch (err) {
      setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo.');
      console.error("Error al cargar productos en ProductListPage:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage, filters, urlSearchTerm]); // urlSearchTerm es una dependencia

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  // Función para manejar el cambio de página (se mantiene igual)
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (newFilterValue) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilterValue };
      // Limpiar filtros vacíos para no enviarlos al backend si no son necesarios
      for (const key in updatedFilters) {
        if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
          delete updatedFilters[key];
        } else if (updatedFilters[key] === null || updatedFilters[key] === undefined || updatedFilters[key] === '') {
          delete updatedFilters[key];
        }
      }
      return updatedFilters;
    });
    setCurrentPage(0); // Reiniciar a la primera página al aplicar un nuevo filtro
  };

  // Renderizado condicional basado en el estado (se mantiene igual)
  if (loading) {
    return (
      <div className="mt-5 px-5 gap-5 flex flex-col items-center justify-center bg-azulProfundo min-h-screen">
        <p className="text-xl text-white">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 px-5 gap-5 flex flex-col items-center justify-center bg-azulProfundo min-h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button
          onClick={() => { setCurrentPage(0); setFilters({}); }} // Elimina el reinicio de searchTerm aquí
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0 && totalPages === 0) {
    return (
      <div className="mt-5 px-5 gap-5 flex flex-col items-center justify-center bg-azulProfundo min-h-screen">
        <p className="text-xl text-white">No hay productos disponibles con estos filtros o búsqueda.</p>
      </div>
    );
  }

  const renderPaginationButtons = () => {
    const pages = [];
    const maxPageButtons = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(0, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? 'bg-blue-700 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          } mx-1 transition-colors`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="mt-5 px-5 gap-5 flex items-start bg-azulProfundo min-h-screen">
      {/* Ya no necesitas una barra de búsqueda local aquí, la Navbar la maneja */}
      {/* Ajusta el `padding-top` si tu Navbar es fija en la parte superior */}
      <div className="pt-20 flex w-full justify-start items-start gap-5"> {/* Padding top para dejar espacio a la Navbar */}
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex-1 flex flex-col">
          <div className="flex flex-wrap gap-5 justify-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-5 p-4 bg-gray-800 rounded-lg">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-2"
              >
                Anterior
              </button>

              {renderPaginationButtons()}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-2"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;