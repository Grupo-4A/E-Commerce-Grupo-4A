import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlSearchTerm = queryParams.get('search') || '';

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

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await getAllProducts(currentPage, productsPerPage, filters, urlSearchTerm);
      setProducts(responseData.content || []);
      setTotalPages(responseData.totalPages || 0);
    } catch (err) {
      setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo.');
      console.error("Error al cargar productos en ProductListPage:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage, filters, urlSearchTerm]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (newFilterValue) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilterValue };
      for (const key in updatedFilters) {
        if (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0) {
          delete updatedFilters[key];
        } else if (updatedFilters[key] === null || updatedFilters[key] === undefined || updatedFilters[key] === '') {
          delete updatedFilters[key];
        }
      }
      return updatedFilters;
    });
    setCurrentPage(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-6">
        <p className="text-xl font-medium text-gray-50 animate-pulse">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-6">
        <p className="text-xl font-medium text-red-400">Error: {error}</p>
        <button
          onClick={() => { setCurrentPage(0); setFilters({}); }}
          className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0 && totalPages === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-6">
        <p className="text-xl font-medium text-gray-50">No hay productos disponibles con estos filtros o búsqueda.</p>
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
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          } mx-1 transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-azulProfundo px-4 py-6">
      <div className="pt-15 flex w-full max-w-7xl mx-auto gap-6">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 mr-2"
              >
                Anterior
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 ml-2"
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