import React, { useEffect, useState } from "react";
import TechNews from "../components/TechNews/TechNews";
import { fetchNews } from "../services/newService"; // sin extensión

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        if (!Array.isArray(data)) throw new Error("La respuesta no es un array");
        setNews(data);
      } catch (err) {
        setError("Error al cargar noticias");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) return <div>Cargando noticias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {news.map((item, index) => (
        <TechNews key={index} news={item} />
      ))}
    </div>
  );
};

export default NewsPage;
