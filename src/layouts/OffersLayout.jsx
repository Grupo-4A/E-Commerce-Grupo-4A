import React from "react";
import Offers from "../components/Offers/Offers";
import products from "../data/products";

const styles = {
  layout: {
    padding: "2rem",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
};

const OffersLayout = () => {
  const offers = products.filter(p => p.onOffer); // solo productos en oferta

  return (
    <div style={styles.layout}>
      <h2 style={styles.title}>Ofertas Especiales</h2>
      <div style={styles.grid}>
        {offers.map(product => (
          <Offers key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OffersLayout;
    