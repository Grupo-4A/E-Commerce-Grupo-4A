import Logo from '../../assets/Logo.png';
import NewsImage from '../../assets/chasis.png'; // Reemplaza con la imagen deseada
import BackgroundImage from '../../assets/btnHar.jpg'; // Usaremos esta como imagen de fondo, reemplázala si necesitas otra

const NewsHome = () => {
  return (
    <div className="w-full h-[400px] my-10 relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)]" >
      <img
        src={BackgroundImage}
        alt="Background"
        className="w-full h-full object-cover rounded-[30px]"
      />
      <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]">
        <div className="flex w-full h-full p-10 box-border">
          {/* Sección izquierda con Imagen */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={NewsImage}
              alt="News Highlight"
              className="w-[460px] h-[320px] object-cover rounded-[30px]"
            />
          </div>

          {/* Sección derecha con Textos */}
          <div className="flex-1 flex flex-col justify-center max-w-[500px]">
            <img
              src={Logo}
              alt="PandoraTech"
              className="w-[150px] mb-5"
            />
            <h1 className="text-2xl font-bold mb-2 text-white">¡Las mejores ofertas para ti!</h1>
            <p className="bg-green-400 text-black font-bold rounded-[10px] px-3 py-1 w-fit mb-5">
              SALE
            </p>
            <button className="bg-white text-black font-bold px-5 py-2 rounded-[10px] hover:bg-gray-300 w-fit transition-colors">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsHome;