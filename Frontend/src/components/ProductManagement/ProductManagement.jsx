import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlusCircle, FiSearch, FiEye, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'; 
import { getAllProducts, deleteProduct, partialUpdateProduct } from '../../services/productService';
import { fetchCategories, fetchBrands } from '../../services/dataService'; // Importar para filtros de datos maestros

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState(''); // Cambiado a ID de categoría
  const [availableCategories, setAvailableCategories] = useState([]); // Para el filtro de categorías
  
  const [currentPage, setCurrentPage] = useState(0); 
  const [productsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [filters, setFilters] = useState({}); // Los filtros dinámicos

  // Efecto para cargar datos iniciales (categorías para el filtro)
  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setAvailableCategories(categoriesData);
      } catch (err) {
        console.error("Error fetching categories for filter:", err);
        // Opcional: Establecer un error visible para el usuario si no se pueden cargar las categorías
      }
    };
    loadMasterData();
  }, []);

  // Efecto para cargar productos cuando cambian los filtros, la página o el término de búsqueda
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, filterCategoryId, currentPage, filters]); // Dependencias para re-fetch

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Preparar filtros para la API
      const apiFilters = {
        ...filters,
        // Si hay un ID de categoría seleccionado, agregarlo a categoryIds
        ...(filterCategoryId && { categoryIds: [parseInt(filterCategoryId)] }) // Asegurarse que es un número
      };

      const response = await getAllProducts(
        currentPage,
        productsPerPage,
        apiFilters,
        searchTerm
      );

      setProducts(response.content || []);
      setTotalPages(response.totalPages || 1);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError("Error al cargar productos: " + (err.message || 'Error desconocido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el producto con ID ${productId}?`)) {
      try {
        await deleteProduct(productId);
        alert('Producto eliminado exitosamente.');
        // Recargar la lista de productos y ajustar la página si es necesario
        // Por ejemplo, si el último elemento de una página fue eliminado
        if (products.length === 1 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        } else {
            fetchProducts();
        }
      } catch (err) {
        alert('Error al eliminar el producto: ' + (err.message || 'Error desconocido'));
        console.error(err);
      }
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      
      await partialUpdateProduct(productId, { status: newStatus });
      alert(`Estado del producto ${currentStatus === 'Active' ? 'desactivado' : 'activado'} exitosamente.`);
      // Solo actualiza el estado de los productos localmente si la API no devuelve la lista completa
      // Si fetchProducts() se ejecuta de nuevo (como aquí), no es estrictamente necesario, pero puede dar feedback más rápido.
      setProducts(products.map(p => p.id === productId ? { ...p, status: newStatus } : p));
      // fetchProducts(); // Opcional: Re-fetch completo para asegurar consistencia
    } catch (err) {
      alert('Error al cambiar el estado del producto: ' + (err.message || 'Error desconocido'));
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Resetear a la primera página al buscar
  };

  const handleCategoryFilterChange = (e) => {
    setFilterCategoryId(e.target.value); // Ahora guarda el ID de la categoría
    setCurrentPage(0); // Resetear a la primera página al filtrar
  };

  if (loading) return (
    <div className="flex justify-center items-center p-8 h-screen-70"> {/* Ajusta altura para centrar */}
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-lg text-gray-700">Cargando productos...</span>
    </div>
  );

  if (error) return (
    <div className="text-center p-4 bg-red-50 border border-red-200 rounded-md mx-auto max-w-2xl mt-8">
      <p className="text-red-600 font-medium">{error}</p>
      <button 
        onClick={fetchProducts}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">
            {totalElements} producto{totalElements !== 1 ? 's' : ''} encontrado{totalElements !== 1 ? 's' : ''}
          </p>
        </div>
        {/* Enlace al componente AddProduct */}
        <Link
          to="/admin/products/new" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center transition-colors duration-200"
        >
          <FiPlusCircle className="mr-2" /> Agregar Producto
        </Link>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-64">
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterCategoryId}
            onChange={handleCategoryFilterChange} // Usar el nuevo manejador
          >
            <option value="">Todas las Categorías</option>
            {availableCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {/* Aquí se podrían añadir más filtros, como marca, estado, rango de precio, etc. */}
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {products.length === 0 && !loading && (
            <p className="p-6 text-center text-gray-600">No se encontraron productos con los filtros aplicados.</p>
          )}
          {products.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{product.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="h-10 w-10 rounded-full object-cover mr-3" 
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.brand?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price ? product.price.toFixed(2) : '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <FiEdit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(product.id, product.status)}
                          className={`p-1 rounded-full ${
                            product.status === 'Active' ? 'text-red-500 hover:bg-red-100' : 'text-green-500 hover:bg-green-100'
                          }`}
                          title={product.status === 'Active' ? 'Desactivar' : 'Activar'}
                        >
                          {product.status === 'Active' ? (
                            <FiToggleRight className="w-6 h-6" /> // Ícono para indicar que está activo, y al hacer click se desactiva
                          ) : (
                            <FiToggleLeft className="w-6 h-6" /> // Ícono para indicar que está inactivo, y al hacer click se activa
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                        {/* Puedes añadir un botón para ver detalles si tienes una ruta de vista: */}
                        {/* <Link
                          to={`/admin/products/view/${product.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Ver Detalles"
                        >
                          <FiEye className="w-5 h-5" />
                        </Link> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center py-4 px-6 bg-white border-t border-gray-200">
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;