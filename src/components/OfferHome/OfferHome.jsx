import Offer from '../Offers/Offers';
import Logo from '../../assets/Logo.png';
import Hardware from '../../assets/btnHar.jpg'; // Usaremos esta como imagen de fondo, reemplázala si necesitas otra

const OfferHome = ({ product }) => {
  return (
    <div className="relative w-full h-[400px]">
      <img
        src={Hardware}
        alt="Background"
        className="w-full h-full object-cover rounded-[30px]"
      />
      <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]">
        <div className="flex w-full h-full p-10 box-border">
          {/* Sección izquierda */}
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

          {/* Sección derecha con Offer */}
          <div className="flex-1 flex items-center justify-center">
            <Offer product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferHome;