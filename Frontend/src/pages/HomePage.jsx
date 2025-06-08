import React, { useEffect, useState } from "react"; // Necesitas useState y useEffect
import Header from "../components/Header/Header";
import Shortcut from "../components/Shortcut/Shortcut";
import Fproducts from "../components/Featuredproducts/Featuredproducts";
import OfferHome from "../components/OfferHome/OfferHome";
import NewsHome from "../components/NewsHome/NewsHome";
// import products from "../data/products"; // <--- ELIMINA ESTA LÍNEA, los productos vendrán de la API
import { getAllProducts } from '../services/productService.js'; // Importa el servicio de productos

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Podrías cargar la primera página de productos o una cantidad específica
        // Aquí asumimos que obtenemos la primera página y tomamos los primeros 5 como "destacados"
        // Si tienes un endpoint /api/products/featured en tu backend, sería mejor usarlo.
        const data = await getAllProducts(0, 5); // Obtiene la primera página, con 5 productos
        setFeaturedProducts(data.content || []); // Asume que el backend devuelve un objeto Page<Product>
      } catch (err) {
        setError('No se pudieron cargar los productos destacados.');
        console.error("Error al cargar productos destacados en HomePage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Aquí puedes añadir un estado de carga o error si quieres mostrarlos en la Home
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-48 bg-gray-100 text-lg text-gray-700">
          Cargando productos destacados...
        </div>
        <Shortcut />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-48 bg-red-100 text-lg text-red-700">
          Error: {error}
        </div>
        <Shortcut />
      </>
    );
  }

  // Si no hay productos destacados
  if (featuredProducts.length === 0) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-48 bg-gray-100 text-lg text-gray-700">
          No hay productos destacados disponibles.
        </div>
        <Shortcut />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Pasar los productos destacados al componente Fproducts */}
      <Fproducts products={featuredProducts} />
      {/* Pasar el primer producto destacado a OfferHome, si existe */}
      {featuredProducts.length > 0 && <OfferHome product={featuredProducts[0]} />}
      <NewsHome />
      <Shortcut />
    </>
  );
};

export default HomePage;