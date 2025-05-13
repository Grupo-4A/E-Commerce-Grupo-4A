import DefaultImage from '../../assets/btnHar.jpg';

const TechNews = ({ news }) => {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:scale-[1.01] transition-transform duration-300"
    >
      <div className="bg-gray-900 text-white p-6 rounded-3xl max-w-6xl mx-auto my-12 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
        <h1 className="text-2xl font-bold mb-4">Noticias de Tecnología</h1>
        <div className="flex gap-6">
          {/* Sección Izquierda con Imagen */}
          <div className="relative flex-1">
            <img
              src={news.img || DefaultImage}
              alt="Tech News"
              className="w-full h-[300px] object-cover rounded-[20px]"
            />
            <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
            <div className="absolute bottom-5 left-5 z-10 text-white text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
              {news.title}
            </div>
          </div>

          {/* Sección Derecha */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="bg-azulClaro text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {news.category || 'General'}
                </span>
              </div>
              <p className="text-grisClaro leading-6 mb-4">
                {news.description}
              </p>
            </div>
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
