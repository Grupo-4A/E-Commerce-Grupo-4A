import styles from './Offers.module.css';

const Offer = ({ product }) => {
  return (
    <div className={styles.offerCard}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p className={styles.price}>
          <span className={styles.oldPrice}>${product.oldPrice}</span> ${product.price}
        </p>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};

export default Offer;
