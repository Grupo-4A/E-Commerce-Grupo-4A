import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  fetchBrands,
  fetchCategories,
  fetchStatuses,
  fetchCompatibilities,
  fetchLicenses,
} from '../../services/dataService';

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

  const [brandsOptions, setBrandsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [statusesOptions, setStatusesOptions] = useState([]);
  const [compatibilitiesOptions, setCompatibilitiesOptions] = useState([]);
  const [licensesOptions, setLicensesOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState(null);

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
  }, []);

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

  if (loadingOptions) {
    return (
      <div className="w-72 bg-gray-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-center h-64 transition-all duration-300">
        <span className="text-lg font-medium animate-pulse">Cargando filtros...</span>
      </div>
    );
  }

  if (optionsError) {
    return (
      <div className="w-72 bg-red-900/90 text-white p-6 rounded-2xl shadow-xl flex items-center justify-center h-64 transition-all duration-300">
        <span className="text-lg font-medium">Error: {optionsError}</span>
      </div>
    );
  }

  return (
    <div className="w-72 max-h-[calc(100vh-120px)] overflow-y-auto bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-xl sticky top-8 transition-all duration-300 hover:shadow-2xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-gray-50">Filtrar por:</h2>

      {/* Marca */}
      <div className="mb-5">
        <button
          onClick={() => toggleSection("brands")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Marca
          <FaChevronDown className={`transform ${openSections.brands ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.brands && (
          <div className="mt-3 space-y-2.5">
            {brandsOptions.map((brand) => (
              <label key={brand.id} className="flex items-center gap-3 text-sm cursor-pointer text-gray-300 hover:text-white transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-gray-900 bg-gray-800"
                  value={brand.id}
                  checked={(filters.brandIds || []).includes(brand.id)}
                  onChange={() => handleCheckboxChange('brandIds', brand.id)}
                /> {brand.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rango de Precio */}
      <div className="mb-5">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Rango de Precio
          <FaChevronDown className={`transform ${openSections.price ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.price && (
          <div className="mt-3 flex gap-3">
            <input
              type="number"
              placeholder="Mínimo $"
              className="w-1/2 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-gray-900 transition-all duration-150"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange(e, 'minPrice')}
            />
            <input
              type="number"
              placeholder="Máximo $"
              className="w-1/2 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-gray-900 transition-all duration-150"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange(e, 'maxPrice')}
            />
          </div>
        )}
      </div>

      {/* Estado del Producto */}
      <div className="mb-5">
        <button
          onClick={() => toggleSection("condition")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Estado
          <FaChevronDown className={`transform ${openSections.condition ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.condition && (
          <div className="mt-3 space-y-2.5">
            {statusesOptions.map((status) => (
              <label key={status.id} className="flex items-center gap-3 text-sm cursor-pointer text-gray-300 hover:text-white transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-gray-900 bg-gray-800"
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
      <div className="mb-5">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Categoría
          <FaChevronDown className={`transform ${openSections.category ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.category && (
          <div className="mt-3 space-y-2.5">
            {categoriesOptions.map((category) => (
              <label key={category.id} className="flex items-center gap-3 text-sm cursor-pointer text-gray-300 hover:text-white transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-gray-900 bg-gray-800"
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
      <div className="mb-5">
        <button
          onClick={() => toggleSection("compatibility")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Compatibilidad
          <FaChevronDown className={`transform ${openSections.compatibility ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.compatibility && (
          <div className="mt-3 space-y-2.5">
            {compatibilitiesOptions.map((compatibility) => (
              <label key={compatibility.id} className="flex items-center gap-3 text-sm cursor-pointer text-gray-300 hover:text-white transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-gray-900 bg-gray-800"
                  value={compatibility.id}
                  checked={(filters.compatibilityIds || []).includes(compatibility.id)}
                  onChange={() => handleCheckboxChange('compatibilityIds', compatibility.id)}
                /> {compatibility.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RAM */}
      <div className="mb-5">
        <button
          onClick={() => toggleSection("ram")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          RAM
          <FaChevronDown className={`transform ${openSections.ram ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.ram && (
          <select
            className="mt-3 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-gray-900 transition-all duration-150"
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

      {/* Espacio en Disco */}
      <div className="mb-5">
        <button
          onClick={() => toggleSection("storage")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Espacio en Disco
          <FaChevronDown className={`transform ${openSections.storage ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.storage && (
          <select
            className="mt-3 w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-gray-900 transition-all duration-150"
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
      <div className="mb-5">
        <button
          onClick={() => toggleSection("license")}
          className="w-full flex justify-between items-center text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
        >
          Licencia
          <FaChevronDown className={`transform ${openSections.license ? "rotate-180" : ""} transition-transform duration-200 text-gray-400`} />
        </button>
        {openSections.license && (
          <div className="mt-3 space-y-2.5">
            {licensesOptions.map((license) => (
              <label key={license.id} className="flex items-center gap-3 text-sm cursor-pointer text-gray-300 hover:text-white transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-gray-900 bg-gray-800"
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