import React, { useState, useEffect } from "react";
import Offer from "../components/Offers/Offers";
import { getAllProducts } from "../services/productService";

const OffersLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await getAllProducts(0, 4); // Obtener 10 productos por página
        const offerProducts = response.content.filter(product => product.discount > 0 || (product.oldPrice && product.oldPrice > product.price));
        setProducts(offerProducts);
      } catch (err) {
        setError('No se pudieron cargar las ofertas. Intenta de nuevo más tarde.');
        console.error("Error al cargar ofertas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-100 min-h-screen px-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 bg-gray-100 min-h-screen px-6">{error}</div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-100 min-h-screen px-6">No hay ofertas disponibles.</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8 mx-4 font-sans rounded-xl shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ofertas Especiales</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Offer key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersLayout;