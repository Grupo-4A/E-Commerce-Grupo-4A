import Offer from '../Offers/Offers';
import Hardware from '../../assets/btnHar.jpg';
const OfferHome = ({ product }) => {
  return (
    <div
      className="relative bg-cover bg-center h-[400px] text-white flex items-center justify-center"
      style={{ backgroundImage: "url('/fondo-tv.jpg')" }} // Asegúrate que la imagen esté en /public
    >
      <div className="bg-black bg-opacity-70 flex w-full h-full p-10 box-border">
        {/* Sección izquierda */}
        <div className="flex-1 flex flex-col justify-center max-w-[500px]">
          <img
            src="/logo-mercado-play.png"
            alt="Mercado Play"
            className="w-[150px] mb-5"
          />
          <h1 className="text-2xl font-bold mb-2">¡Series y películas también en TV!</h1>
          <p className="bg-green-400 text-black font-bold rounded px-3 py-1 w-fit mb-5">GRATIS</p>
          <button className="bg-white text-black font-bold px-5 py-2 rounded hover:bg-gray-300 w-fit transition">
            Ir a Mercado Play
          </button>
        </div>

        {/* Sección derecha con Offer */}
        <div className="flex-1 flex items-center justify-center">
          <Offer product={product} />
        </div>
      </div>
    </div>
  );
};

export default OfferHome;
