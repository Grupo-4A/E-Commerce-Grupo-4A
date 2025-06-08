import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect
import { FaChevronDown } from "react-icons/fa";
import {
  fetchBrands,
  fetchCategories,
  fetchStatuses,
  fetchCompatibilities,
  fetchLicenses,
} from '../../services/dataService'; // Importa los servicios de datos maestros

// Opciones estáticas para RAM y Espacio en Disco (si no las manejas en la DB, se mantienen)
const RAM_OPTIONS = [
  { value: 4, label: "4GB" },
  { value: 8, label: "8GB" },
  { value: 16, label: "16GB" },
  { value: 32, label: "32GB" },
];

const STORAGE_OPTIONS = [
  { value: "32GB", label: "32GB" },
  { value: "64GB", label: "64GB" },
  { value: "128GB", label: "128GB" },
  { value: "256GB", label: "256GB" },
  { value: "512GB", label: "512GB" },
  { value: "1TB", label: "1TB" },
];

const Filters = ({ filters, onFilterChange }) => {
  const [openSections, setOpenSections] = useState({
    brands: true,
    price: false,
    condition: false,
    category: false,
    compatibility: false,
    ram: false,
    storage: false,
    license: false,
  });

  // NUEVOS ESTADOS para almacenar las opciones de filtro obtenidas del backend
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [statusesOptions, setStatusesOptions] = useState([]);
  const [compatibilitiesOptions, setCompatibilitiesOptions] = useState([]);
  const [licensesOptions, setLicensesOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

  // useEffect para cargar las opciones al montar el componente
  useEffect(() => {
    const loadFilterOptions = async () => {
      setLoadingOptions(true);
      setOptionsError(null);
      try {
        const [brands, categories, statuses, compatibilities, licenses] = await Promise.all([
          fetchBrands(),
          fetchCategories(),
          fetchStatuses(),
          fetchCompatibilities(),
          fetchLicenses(),
        ]);
        setBrandsOptions(brands);
        setCategoriesOptions(categories);
        setStatusesOptions(statuses);
        setCompatibilitiesOptions(compatibilities);
        setLicensesOptions(licenses);
      } catch (error) {
        console.error("Error al cargar las opciones de filtro:", error);
        setOptionsError('No se pudieron cargar algunas opciones de filtro.');
      } finally {
        setLoadingOptions(false);
      }
    };
    loadFilterOptions();
  }, []); // El array de dependencias vacío asegura que se ejecuta solo una vez al montar

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((item) => item !== value);
    } else {
      newValues = [...currentValues, value];
    }
    onFilterChange({ [filterName]: newValues });
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    onFilterChange({ [type]: value });
  };

  const handleSelectChange = (e, filterName) => {
    const value = e.target.value === '' ? null : (filterName === 'ramValues' ? Number(e.target.value) : e.target.value);
    onFilterChange({ [filterName]: value ? [value] : [] });
  };

  // Mostrar mensaje de carga o error mientras se obtienen las opciones
  if (loadingOptions) {
    return (
      <div className="w-64 bg-gray-800 text-gray-100 p-6 rounded-xl shadow-lg flex items-center justify-center h-48">
        Cargando filtros...
      </div>
    );
  }

  if (optionsError) {
    return (
      <div className="w-64 bg-red-800 text-white p-6 rounded-xl shadow-lg flex items-center justify-center h-48">
        Error al cargar filtros: {optionsError}
      </div>
    );
  }

  return (
    <div className="w-64 h-[calc(100vh-100px)] overflow-y-auto bg-gray-800 text-gray-100 p-6 rounded-xl shadow-lg sticky top-6 transition-all duration-300 hover:shadow-xl">
      <p className="text-xl font-bold mb-6">Filtrar por:</p>

      {/* Marca */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("brands")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Marca
          <FaChevronDown className={`transform ${openSections.brands ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.brands && (
          <div className="space-y-2">
            {brandsOptions.map((brand) => ( // <<-- AHORA USA brandsOptions (dinámicas)
              <label key={brand.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  value={brand.id}
                  checked={(filters.brandIds || []).includes(brand.id)}
                  onChange={() => handleCheckboxChange('brandIds', brand.id)}
                /> {brand.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rango de Precio (se mantiene estático, no viene de la DB) */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Rango de Precio
          <FaChevronDown className={`transform ${openSections.price ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.price && (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mínimo $"
              className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange(e, 'minPrice')}
            />
            <input
              type="number"
              placeholder="Máximo $"
              className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange(e, 'maxPrice')}
            />
          </div>
        )}
      </div>

      {/* Estado del Producto */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("condition")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Estado
          <FaChevronDown className={`transform ${openSections.condition ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.condition && (
          <div className="space-y-2">
            {statusesOptions.map((status) => ( // <<-- AHORA USA statusesOptions (dinámicas)
              <label key={status.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  value={status.id}
                  checked={(filters.statusIds || []).includes(status.id)}
                  onChange={() => handleCheckboxChange('statusIds', status.id)}
                /> {status.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Categoría */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Categoría
          <FaChevronDown className={`transform ${openSections.category ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {categoriesOptions.map((category) => ( // <<-- AHORA USA categoriesOptions (dinámicas)
              <label key={category.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  value={category.id}
                  checked={(filters.categoryIds || []).includes(category.id)}
                  onChange={() => handleCheckboxChange('categoryIds', category.id)}
                /> {category.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Compatibilidad */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("compatibility")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Compatibilidad
          <FaChevronDown className={`transform ${openSections.compatibility ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.compatibility && (
          <div className="space-y-2">
            {compatibilitiesOptions.map((compatibility) => ( // <<-- AHORA USA compatibilitiesOptions (dinámicas)
              <label key={compatibility.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  value={compatibility.id}
                  checked={(filters.compatibilityIds || []).includes(compatibility.id)}
                  onChange={() => handleCheckboxChange('compatibilityIds', compatibility.id)}
                /> {compatibility.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RAM (estático, como en tu código original) */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("ram")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          RAM
          <FaChevronDown className={`transform ${openSections.ram ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.ram && (
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={(filters.ramValues && filters.ramValues[0]) || ''}
            onChange={(e) => handleSelectChange(e, 'ramValues')}
          >
            <option value="" disabled>Selecciona RAM</option>
            {RAM_OPTIONS.map((ram) => (
              <option key={ram.value} value={ram.value}>{ram.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Espacio en Disco (estático, como en tu código original) */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("storage")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Espacio en Disco
          <FaChevronDown className={`transform ${openSections.storage ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.storage && (
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={(filters.diskSpaceValues && filters.diskSpaceValues[0]) || ''}
            onChange={(e) => handleSelectChange(e, 'diskSpaceValues')}
          >
            <option value="" disabled>Selecciona espacio</option>
            {STORAGE_OPTIONS.map((storage) => (
              <option key={storage.value} value={storage.value}>{storage.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Licencia */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("license")}
          className="w-full flex justify-between items-center text-sm font-semibold mb-2 hover:text-gray-300 transition-colors"
        >
          Licencia
          <FaChevronDown className={`transform ${openSections.license ? "rotate-180" : ""} transition-transform`} />
        </button>
        {openSections.license && (
          <div className="space-y-2">
            {licensesOptions.map((license) => ( // <<-- AHORA USA licensesOptions (dinámicas)
              <label key={license.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  value={license.id}
                  checked={(filters.licenseIds || []).includes(license.id)}
                  onChange={() => handleCheckboxChange('licenseIds', license.id)}
                /> {license.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;