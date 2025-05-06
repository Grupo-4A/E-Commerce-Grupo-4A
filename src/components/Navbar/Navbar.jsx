import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import styles from './Navbar.module.css';
import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Buscar..."
            />
            <FiSearch className={styles.icon} />
          </div>
          <ul className={styles.navLinks}>
            <li><a onClick={() => navigate ("/")}>Inicio</a></li>
            <li><a onClick={() => navigate("/categorias")}>Categorías</a></li>
            <li><a onClick={() => navigate ("/ofertas")}>Ofertas</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Soporte</a></li>
          </ul>
          <FiShoppingCart className={styles.cartIcon} />
        </div>
      </nav>

      <div className={styles.navbarButtons}>
        <button className={styles.btnLogin}
          onClick={() => navigate("/login")}
        >Iniciar Sesión</button>
        <button className={styles.btnRegister}
        onClick={() => navigate("/login")}
        >Regístrate</button>
      </div>
    </div>
  );
};

export default Navbar;

