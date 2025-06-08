import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/Productcard.jsx";
import Filters from "../components/Filters/Filters.jsx";
import { getAllProducts } from '../services/productService.js'; // Asegúrate que este archivo esté separado y correcto

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Página actual (0-indexed, como Spring Boot Pageable)
  const [totalPages, setTotalPages] = useState(0); // Total de páginas recibidas del backend
  const productsPerPage = 12; // Número de productos a mostrar por página (debe coincidir con el 'size' por defecto de tu API)

  // useEffect para cargar los productos cuando el componente se monta o la página cambia
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true); // Siempre que se inicie una nueva carga, establecer loading a true
      setError(null); // Limpiar cualquier error previo

      try {
        // Llama a la API con la página y el tamaño deseado
        const responseData = await getAllProducts(currentPage, productsPerPage);


        // responseData.content contendrá la lista de productos
        // responseData.totalPages contendrá el número total de páginas
        // responseData.totalElements contendrá el número total de elementos
        setProducts(responseData.content || []); // Usa .content para la lista de productos
        setTotalPages(responseData.totalPages || 0); // Usa .totalPages para el total de páginas

      } catch (err) {
        setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo.');
        console.error("Error al cargar productos en ProductListPage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [currentPage, productsPerPage]); // Dependencias: recargar cuando currentPage o productsPerPage cambien

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    // Asegurarse de que el número de página esté dentro de los límites válidos
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      // Opcional: hacer scroll al inicio de la página después de cambiar la paginación
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Renderizado condicional basado en el estado
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
          onClick={() => setCurrentPage(0)} // Intentar recargar desde la primera página
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Si no hay productos después de cargar y sin errores
  // También verificar totalPages, ya que podría haber 0 productos y 0 páginas
  if (products.length === 0 && totalPages === 0) {
    return (
      <div className="mt-5 px-5 gap-5 flex flex-col items-center justify-center bg-azulProfundo min-h-screen">
        <p className="text-xl text-white">No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  // Generar los botones de paginación
  const renderPaginationButtons = () => {
    const pages = [];
    const maxPageButtons = 5; // Cantidad de botones de página visibles a la vez (ej. 1 2 3 4 5)
    let startPage = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

    // Ajustar startPage si endPage es muy bajo para llenar maxPageButtons
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
              ? 'bg-blue-700 text-white' // Estilo para la página actual
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600' // Estilo para otras páginas
          } mx-1 transition-colors`}
        >
          {i + 1} {/* Mostrar 1-indexed para el usuario (página 0 es página 1) */}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="mt-5 px-5 gap-5 flex items-start bg-azulProfundo min-h-screen">
      <Filters />

      <div className="flex-1 flex flex-col"> {/* Cambiado a flex-col para organizar productos y paginación */}
        {/* Contenedor de tarjetas de productos */}
        <div className="flex flex-wrap gap-5 justify-start">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Controles de Paginación */}
        {totalPages > 1 && ( // Solo muestra los controles si hay más de una página
          <div className="flex justify-center items-center mt-8 mb-5 p-4 bg-gray-800 rounded-lg">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mr-2"
            >
              Anterior
            </button>

            {renderPaginationButtons()} {/* Renderiza los botones numéricos de página */}

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
  );
};

export default ProductListPage;