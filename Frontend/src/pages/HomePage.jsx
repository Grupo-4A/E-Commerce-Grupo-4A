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
    let isMounted = true;

    const fetchFeaturedProducts = async () => {
      try {
        const data = await getAllProducts(0, 4); // Traer los primeros 4 productos
        if (isMounted) {
          setFeaturedProducts(data.content || []);
        }
      } catch (err) {
        console.error("Error al cargar productos destacados:", err);
        if (isMounted) {
          setError("No se pudieron cargar los productos destacados.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedProducts();

    return () => {
      isMounted = false; // Evitar actualizaciones de estado en componente desmontado
    };
  }, []);

  // Manejar agregar producto al carrito
  const handleAddToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart];
      const index = updatedCart.findIndex(item => item.id === product.id);

      if (index !== -1) {
        updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + 1 };
      } else {
        updatedCart.push({
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

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      window.dispatchEvent(new CustomEvent("cartUpdated", {
        detail: {
          cart: updatedCart,
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <Header />
        <div className="flex flex-col justify-center items-center h-32 sm:h-48 bg-gray-100 rounded-lg m-4 sm:m-6 md:m-8 p-4 sm:p-6">
          <div
            className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mb-4"
            role="status"
            aria-label="Cargando productos destacados"
          ></div>
          <p className="text-base sm:text-lg text-gray-700 text-center">
            Cargando productos destacados...
          </p>
        </div>
        <Shortcut />
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <Header />
        <div
          className="flex flex-col justify-center items-center min-h-[200px] bg-red-50 border border-red-200 rounded-lg m-4 sm:m-6 md:m-8 p-4 sm:p-6"
          role="alert"
        >
          <div className="text-red-500 text-3xl sm:text-4xl mb-4">⚠️</div>
          <p className="text-base sm:text-lg text-red-700 text-center">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-red-600 transition-colors"
            aria-label="Reintentar carga de productos"
          >
            Reintentar
          </button>
        </div>
        <Shortcut />
      </div>
    );
  }

  // Estado sin productos
  if (featuredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-[200px] bg-gray-100 rounded-lg m-4 sm:m-6 md:m-8 p-4 sm:p-6">
          <div className="text-gray-400 text-3xl sm:text-4xl mb-4">📦</div>
          <p className="text-base sm:text-lg text-gray-700 text-center">
            No hay productos destacados disponibles en este momento.
          </p>
        </div>
        <Shortcut />
      </div>
    );
  }

  // Vista principal
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
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
    </div>
  );
};

export default HomePage;