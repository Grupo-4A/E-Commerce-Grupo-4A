import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <img src="" alt="Logo" className={styles.logo} />
          <div className={styles.searchBar}>
            <input type="text" placeholder="Buscar..." />
            <FiSearch className={styles.icon} />
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Categorías</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Soporte</a></li>
          </ul>
          <FiShoppingCart className={styles.cartIcon} />
        </div>
      </nav>

      <div className={styles.navbarButtons}>
        <button className={styles.btnLogin}>Iniciar Sesión</button>
        <button className={styles.btnRegister}>Regístrate</button>
      </div>
    </div>
  );
};

export default Navbar;
