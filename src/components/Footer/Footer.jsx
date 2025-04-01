import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Footer.module.css";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Sección de Información */}
        <div className={styles.footerSection}>
          <h2 className={styles.title}>PandoraTech</h2>
          <p className={styles.text}>Tu ecommerce de confianza con los mejores productos y envíos rápidos. Garantía y calidad aseguradas.</p>
        </div>

        {/* Enlaces Rápidos */}
        <div className={styles.footerSection}>
          <h2 className={styles.title}>Enlaces Rápidos</h2>
          <ul className={styles.list}>
            <li><a href="/about" className={styles.link}>Sobre Nosotros</a></li>
            <li><a href="/shop" className={styles.link}>Tienda</a></li>
            <li><a href="/contact" className={styles.link}>Contacto</a></li>
            <li><a href="/faq" className={styles.link}>Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className={styles.footerSection}>
          <h2 className={styles.title}>Contacto</h2>
          <p className={styles.text}>📍 Calle 123, Ciudad</p>
          <p className={styles.text}>📞 +123 456 7890</p>
          <p className={styles.text}>📧 info@ecommerce.com</p>

          {/* Redes Sociales */}
          <div className={styles.footerSocials}>
            <a href="#" className={styles.socialIcon}><FaFacebookF /></a>
            <a href="#" className={styles.socialIcon}><FaX /></a>
            <a href="#" className={styles.socialIcon}><FaInstagram /></a>
            <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Ecommerce. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
