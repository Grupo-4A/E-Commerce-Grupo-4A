// frontend/src/components/SidebarProfile/SidebarProfile.jsx
import React from "react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: <FiHome />, path: "/" },
  { name: "Trending", icon: <FiTrendingUp />, path: "/trending" },
  { name: "Explore", icon: <FiCompass />, path: "/explore" },
  { name: "Favourites", icon: <FiStar />, path: "/favourites" },
  { name: "Settings", icon: <FiSettings />, path: "/settings" },
];

const SidebarProfile = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

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
            <button
              key={item.name}
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 transition-colors rounded-md w-full text-left cursor-pointer"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-3 text-xl flex items-center">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarProfile;