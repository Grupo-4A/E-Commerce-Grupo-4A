import styles from './Featuredproducts.module.css';
import { FiShoppingCart } from 'react-icons/fi';

const Featuredproducts = () => {
    return (
    <div className={styles.containerCard}>
    
      <div className={styles.featuredCards}>
        <div className={styles.cardImage}>
              <img src="" alt="" />
        </div>
        <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>titylo</h4>
              <p className={styles.cardDescription}>fsdkfkjshfkdñngkjdhfgkd</p>
              <p className={styles.cardPrice}>$100</p>
        </div>
        <div className={styles.cardFooter}>
            <FiShoppingCart className={styles.cardCartIcon} />
            <button>Comprar</button>
        </div>
      </div>

      

    </div>
    );
}

export default Featuredproducts;
