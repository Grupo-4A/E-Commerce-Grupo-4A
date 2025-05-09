import Header from "../components/Header/Header";
import Shortcut from "../components/Shortcut/Shortcut";
import Fproducts from "../components/Featuredproducts/Featuredproducts";
import OfferHome from "../components/OfferHome/OfferHome";
import products from "../data/products"; // <--- Importar productos

const HomePage = () => {
  const featured = products.slice(0, 5); 

  return (
    <>
      <Header />
      <Fproducts products={featured} /> 
      <OfferHome product={featured[0]} /> 
      <Shortcut />
    </>
  );
};

export default HomePage;
