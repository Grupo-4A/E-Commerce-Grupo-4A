import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// Mapeos de IDs para los filtros (ajusta estos IDs según tu base de datos)
const BRAND_OPTIONS = [
  { id: 1, name: "Apple" },
  { id: 2, name: "HP" },
  { id: 3, name: "Lenovo" },
  { id: 4, name: "Dell" },
  { id: 5, name: "Asus" },
];

const STATUS_OPTIONS = [
  { id: 1, name: "Nuevo" },
  { id: 2, name: "Usado" },
  { id: 3, name: "Reacondicionado" },
];

const CATEGORY_OPTIONS = [
  { id: 1, name: "Hardware" },
  { id: 2, name: "Software" },
  { id: 3, name: "Plantilla Frontend" },
];

const COMPATIBILITY_OPTIONS = [
  { id: 1, name: "Windows" },
  { id: 2, name: "macOS" },
  { id: 3, name: "Linux" },
  { id: 4, name: "Android" },
  { id: 5, name: "iOS" },
];

const LICENSE_OPTIONS = [
  { id: 1, name: "Libre" },
  { id: 2, name: "Propietaria" },
];

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
  { value: "1TB", label: "1TB" }, // Asegúrate que tu DB guarda "1TB" o "1000GB" si es el caso
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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (filterName, value, type = 'id') => {
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
    onFilterChange({ [filterName]: value ? [value] : [] }); // Para select, enviamos un array con un solo valor o vacío
  };

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
            {BRAND_OPTIONS.map((brand) => (
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

      {/* Rango de Precio */}
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
            {STATUS_OPTIONS.map((status) => (
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
            {CATEGORY_OPTIONS.map((category) => (
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
            {COMPATIBILITY_OPTIONS.map((compatibility) => (
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

      {/* RAM */}
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

      {/* Espacio en Disco */}
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
            {LICENSE_OPTIONS.map((license) => (
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