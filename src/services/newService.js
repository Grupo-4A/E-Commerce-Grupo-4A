// src/services/newsService.js

export const fetchNews = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/news"); // Ajusta la URL si tu backend es distinto
    if (!response.ok) {
      throw new Error("Error al obtener las noticias");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchNews:", error);
    throw error;
  }
};
