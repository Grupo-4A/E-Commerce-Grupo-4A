import DefaultImage from '../../assets/btnHar.jpg';

// Componente funcional que recibe una noticia como prop
const TechNews = ({ news }) => {
  return (
    // Contenedor principal que redirige al enlace de la noticia al hacer clic
    <a
      href={news.url} // URL de la noticia
      target="_blank" // Abre en una nueva pestaña
      rel="noopener noreferrer" // Mejora la seguridad de enlaces externos
      className="block hover:scale-[1.01] transition-transform duration-300" // Animación al pasar el mouse
    >
      {/* Tarjeta de la noticia */}
      <div className="bg-gray-900 text-white p-6 rounded-3xl max-w-6xl mx-auto my-12 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
        {/* Título general de la sección */}
        <h1 className="text-2xl font-bold mb-4">Noticias de Tecnología</h1>

        {/* Contenedor principal con imagen a la izquierda y contenido a la derecha */}
        <div className="flex gap-6">

          {/* Sección Izquierda: Imagen de la noticia */}
          <div className="relative flex-1">
            <img
              src={news.img || DefaultImage} // Si no hay imagen, usa la imagen por defecto
              alt="Tech News"
              className="w-full h-[300px] object-cover rounded-[20px]" // Imagen responsive con bordes redondeados
            />
            {/* Superposición oscura encima de la imagen para mejorar contraste */}
            <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>

            {/* Título de la noticia encima de la imagen */}
            <div className="absolute bottom-5 left-5 z-10 text-white text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
              {news.title}
            </div>
          </div>

          {/* Sección Derecha: Categoría, descripción y fuente */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Categoría de la noticia */}
              <div className="flex gap-2 mb-2">
                <span className="bg-azulClaro text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {news.category || 'General'} {/* Si no hay categoría, muestra 'General' */}
                </span>
              </div>

              {/* Descripción de la noticia */}
              <p className="text-grisClaro leading-6 mb-4">
                {news.description}
              </p>
            </div>

            {/* Fuente y fecha de la noticia */}
            <div className="flex items-center gap-2">
              <span className="text-blanco text-sm">
                {news.source} — {news.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TechNews;
