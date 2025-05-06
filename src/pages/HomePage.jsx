import Header from "../components/Header/Header";
import Shortcut from "../components/Shortcut/Shortcut";
import Fproducts from "../components/Featuredproducts/Featuredproducts";
import products from "../data/products"; // <--- Importar productos

const HomePage = () => {
  const featured = products.slice(0, 5); 

  return (
    <>
      <Header />
      <Shortcut />
      <Fproducts products={featured} /> 
    </>
  );
};

export default HomePage;
