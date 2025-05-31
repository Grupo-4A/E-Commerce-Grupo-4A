import React from "react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiX } from "react-icons/fi";

const LinkItems = [
  { name: "Home", icon: <FiHome /> },
  { name: "Trending", icon: <FiTrendingUp /> },
  { name: "Explore", icon: <FiCompass /> },
  { name: "Favourites", icon: <FiStar /> },
  { name: "Settings", icon: <FiSettings /> },
];

const SidebarProfile = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay para cuando el sidebar está abierto */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out md:transform-none md:z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 h-16">
          <h2 className="text-xl font-bold">Logo</h2>
          <button
            className="bg-transparent border-none text-xl cursor-pointer flex items-center justify-center p-1 rounded-md hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <nav className="p-4">
          {LinkItems.map((item) => (
            <a
              href="#"
              key={item.name}
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
            >
              <span className="mr-3 text-xl flex items-center">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarProfile;