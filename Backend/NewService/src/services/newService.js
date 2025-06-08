import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import NewsAPI from 'newsapi';
import dotenv from 'dotenv'; 
dotenv.config();

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del archivo de respaldo
const DATA_FILE = path.join(__dirname, '../data/news.json');

let cachedNews = [];

// Cargar noticias desde archivo local
const loadFromFile = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      cachedNews = JSON.parse(data);
      console.log('Noticias cargadas desde respaldo local');
    }
  } catch (err) {
    console.error('Error leyendo archivo local:', err.message);
  }
};

// Guardar noticias al archivo local
const saveToFile = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedNews, null, 2), 'utf8');
    console.log('Noticias guardadas en respaldo local');
  } catch (err) {
    console.error('Error guardando archivo local:', err.message);
  }
};

// Obtener noticias de NewsAPI y actualizarlas
const fetchAndCacheNews = async () => {
  try {
    const response = await newsapi.v2.topHeadlines({
      category: 'technology',
      language: 'en',
      country: 'us',
      pageSize: 10,
    });

    if (response.status === 'ok') {
      cachedNews = response.articles.map(article => ({
      author: article.author || 'Unknown',
      title: article.title,
      description: article.description,
      source: article.source.name,
      img: article.urlToImage || 'https://via.placeholder.com/150',
      date: new Date(article.publishedAt).toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
      }),
      url: article.url,
      }));

      console.log('Noticias actualizadas desde la API.');
      saveToFile();
    }
  } catch (error) {
    console.error('Error al obtener noticias de la API:', error.message);
  }
};

// Lógica para iniciar el sistema de actualizaciones
export const startNewsUpdater = () => {
  loadFromFile();
  fetchAndCacheNews();
  setInterval(fetchAndCacheNews, 24 * 60 * 60 * 1000); // Cada 24 horas
};

// Obtener noticias en caché
export const getCachedNews = () => cachedNews;
