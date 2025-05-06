import React, { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import styles from './NavbarPro.module.css';

const Header = ({ onOpenSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Cerrar el menú desplegable cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      if (menuOpen) setMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.menuBtn}
          onClick={onOpenSidebar}
        >
          <FiMenu />
        </button>
        <h1 className={styles.logo}>Logo</h1>
      </div>
      
      <div className={styles.headerRight}>
        <button className={styles.menuBtn}>
          <FiBell />
        </button>
        
        <div className={styles.avatarContainer}>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              alt="Avatar"
            />
            <FiChevronDown style={{ marginLeft: '5px' }} />
          </div>
          
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.menuItem}>Perfil</div>
              <div className={styles.menuItem}>Configuración</div>
              <div className={styles.menuItem}>Facturación</div>
              <div className={styles.menuDivider}></div>
              <div className={styles.menuItem}>Cerrar sesión</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;