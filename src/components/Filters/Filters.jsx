import React from "react";

const Filters = () => {
  return (
    <div className="w-64 h-[calc(100vh-100px)] overflow-y-auto bg-gray-800 text-gray-100 p-6 rounded-xl shadow-lg sticky top-6 transition-all duration-300 hover:shadow-xl">
      <p className="text-xl font-bold mb-6">Filtrar por:</p>

      {/* Marca */}
      <p className="text-sm font-semibold mt-6 mb-3">Marca</p>
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

      {/* Rango de Precio */}
      <p className="text-sm font-semibold mt-6 mb-3">Rango de Precio</p>
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

      {/* Estado del Producto */}
      <p className="text-sm font-semibold mt-6 mb-3">Estado</p>
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

      {/* Categoría */}
      <p className="text-sm font-semibold mt-6 mb-3">Categoría</p>
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

      {/* Compatibilidad */}
      <p className="text-sm font-semibold mt-6 mb-3">Compatibilidad</p>
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

      {/* RAM */}
      <p className="text-sm font-semibold mt-6 mb-3">RAM</p>
      <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="" disabled>Selecciona RAM</option>
        <option value="4">4GB</option>
        <option value="8">8GB</option>
        <option value="16">16GB</option>
        <option value="32">32GB</option>
      </select>

      {/* Espacio en Disco */}
      <p className="text-sm font-semibold mt-6 mb-3">Espacio en Disco (mínimo requerido)</p>
      <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="" disabled>Selecciona espacio</option>
        <option value="32">32GB</option>
        <option value="64">64GB</option>
        <option value="128">128GB</option>
        <option value="256">256GB</option>
        <option value="512">512GB</option>
        <option value="1000">1TB</option>
      </select>

      {/* Licencia */}
      <p className="text-sm font-semibold mt-6 mb-3">Licencia</p>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
          <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Libre
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-300 transition-colors">
          <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" /> Propietaria
        </label>
      </div>
    </div>
  );
};

export default Filters;