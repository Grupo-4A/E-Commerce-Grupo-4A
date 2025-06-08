import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Filters = () => {
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

  return (
    <div className="w-64 h-[calc(100vh-100px)] overflow-y-auto bg-gray-800 text-gray-100 p-6 rounded-xl shadow-lg sticky top-6 transition-all duration-300 hover:shadow-xl">
      <p className="text-xl  font-bold mb-6">Filtrar por:</p>

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
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Apple
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> HP
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Lenovo
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Dell
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Asus
            </label>
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
            />
            <input
              type="number"
              placeholder="Máximo $"
              className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Nuevo
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Usado
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Reacondicionado
            </label>
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
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Hardware
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Software
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Plantilla Frontend
            </label>
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
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Windows
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> macOS
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Linux
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Android
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> iOS
            </label>
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
          <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="" disabled>Selecciona RAM</option>
            <option value="4">4GB</option>
            <option value="8">8GB</option>
            <option value="16">16GB</option>
            <option value="32">32GB</option>
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
          <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="" disabled>Selecciona espacio</option>
            <option value="32">32GB</option>
            <option value="64">64GB</option>
            <option value="128">128GB</option>
            <option value="256">256GB</option>
            <option value="512">512GB</option>
            <option value="1000">1TB</option>
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
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Libre
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Propietaria
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;