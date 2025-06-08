import { getCachedNews } from '../services/newService.js'; // Importación con extensión 

export const getNews = (req, res) => {
  try {
    const news = getCachedNews();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ message: 'Error al obtener las noticias.' });
  }
};
