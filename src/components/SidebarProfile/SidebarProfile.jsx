import React from 'react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass, 
  FiStar,
  FiSettings,
  FiX
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const LinkItems = [
  { name: 'Home', icon: <FiHome /> },
  { name: 'Trending', icon: <FiTrendingUp /> },
  { name: 'Explore', icon: <FiCompass /> },
  { name: 'Favourites', icon: <FiStar /> },
  { name: 'Settings', icon: <FiSettings /> }
];

const SidebarProfile = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay para cuando el sidebar está abierto */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarLogo}>Logo</h2>
          <button 
            className={styles.closeBtn}
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {LinkItems.map((item) => (
            <a 
              href="#" 
              key={item.name} 
              className={styles.navItem}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SidebarProfile;