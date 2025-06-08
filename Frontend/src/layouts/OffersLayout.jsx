import React from "react";
import Offers from "../components/Offers/Offers";
import products from "../data/products";
import { BiBorderRadius } from "react-icons/bi";

const styles = {
  layout: {
    padding: "2rem",
    backgroundColor: "#F3F4F6",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    margin: "40px 25px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // <-- exactamente 2 tarjetas por fila
    gap: "1.5rem",
  },
};



const OffersLayout = () => {
  const offers = products.filter(p => p.onOffer); // solo productos en oferta

  return (
    <div style={styles.layout}>
      <h1 style={styles.title}>Ofertas Especiales</h1>
      <div style={styles.grid}>
        {offers.map(product => (
          <Offers key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OffersLayout;
    