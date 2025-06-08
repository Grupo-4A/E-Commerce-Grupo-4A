// Importamos React, y los hooks useEffect y useState
import React, { useEffect, useState } from "react";

// Importamos el componente que mostrará cada noticia tecnológica
import TechNews from "../components/TechNews/TechNews";

// Importamos el servicio que obtiene las noticias
import { fetchNews } from "../services/newService"; 

// Definimos el componente funcional NewsPage
const NewsPage = () => {
  // Estado para guardar las noticias obtenidas
  const [news, setNews] = useState([]);

  // Estado para controlar si está cargando
  const [loading, setLoading] = useState(true);

  // Estado para guardar un posible mensaje de error
  const [error, setError] = useState(null);

  // Hook useEffect que se ejecuta al cargar el componente (una sola vez por el array vacío [])
  useEffect(() => {
    // Función asíncrona que carga las noticias
    const loadNews = async () => {
      try {
        // Llama al servicio para obtener las noticias
        const data = await fetchNews();

        // Validación: asegúrate de que la respuesta es un array
        if (!Array.isArray(data)) throw new Error("La respuesta no es un array");

        // Si todo va bien, actualiza el estado con las noticias
        setNews(data);
      } catch (err) {
        // Si hay error, actualiza el estado de error y lo muestra en consola
        setError("Error al cargar noticias");
        console.error(err);
      } finally {
        // Ya sea que haya error o no, dejamos de mostrar el mensaje de carga
        setLoading(false);
      }
    };

    // Ejecutamos la función que carga las noticias
    loadNews();
  }, []);

  // Mientras se cargan las noticias, mostramos un mensaje
  if (loading) return <div>Cargando noticias...</div>;

  // Si hubo error, lo mostramos
  if (error) return <div>{error}</div>;

  // Si ya se cargaron las noticias correctamente, las mostramos usando el componente TechNews
  return (
    <div>
      {news.map((item, index) => (
        // Se pasa cada noticia como prop al componente TechNews
        <TechNews key={index} news={item} />
      ))}
    </div>
  );
};

// Exportamos el componente para poder usarlo en otras partes de la app
export default NewsPage;
