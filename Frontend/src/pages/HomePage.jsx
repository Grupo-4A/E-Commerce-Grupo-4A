import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Shortcut from "../components/Shortcut/Shortcut";
import Fproducts from "../components/Featuredproducts/Featuredproducts";
import OfferHome from "../components/OfferHome/OfferHome";
import NewsHome from "../components/NewsHome/NewsHome";
import { getAllProducts } from "../services/productService.js";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos destacados al montar el componente
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getAllProducts(0, 5); // Traer los primeros 5 productos
        setFeaturedProducts(data.content || []);
      } catch (err) {
        console.error("Error al cargar productos destacados:", err);
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Manejar agregar producto al carrito
  const handleAddToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const index = existingCart.findIndex(item => item.id === product.id);

      if (index !== -1) {
        existingCart[index].quantity += 1;
      } else {
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1,
          inStock: true,
          shipping: "In stock"
        });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      window.dispatchEvent(new CustomEvent("cartUpdated", {
        detail: {
          cart: existingCart,
          addedProduct: product
        }
      }));

      console.log(`${product.name} agregado al carrito`);
    } catch (err) {
      console.error("Error al agregar producto al carrito:", err);
      alert("Error al agregar el producto al carrito");
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-48 bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-700">Cargando productos destacados...</p>
        </div>
        <Shortcut />
      </>
    );
  }

  // Estado de error
  if (error) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-48 bg-red-50 border border-red-200 rounded-lg mx-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-lg text-red-700 text-center">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
        <Shortcut />
      </>
    );
  }

  // Estado sin productos
  if (featuredProducts.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-48 bg-gray-100 rounded-lg mx-8">
          <div className="text-gray-400 text-4xl mb-4">📦</div>
          <p className="text-lg text-gray-700 text-center">
            No hay productos destacados disponibles en este momento.
          </p>
        </div>
        <Shortcut />
      </>
    );
  }

  // Vista principal
  return (
    <>
      <Header />
      <Fproducts 
        products={featuredProducts}
        onAddToCart={handleAddToCart}
      />
      {featuredProducts.length > 0 && (
        <OfferHome 
          product={featuredProducts[0]}
          onAddToCart={handleAddToCart}
        />
      )}
      <NewsHome />
      <Shortcut />
    </>
  );
};

export default HomePage;
