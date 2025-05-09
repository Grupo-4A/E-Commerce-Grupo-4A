import Software from '../../assets/btnSof.jpg';
import Plantillas from '../../assets/btnPlan.jpg';
import Hardware from '../../assets/ram.png';

const Shortcut = () => {
  return (
    <div className="flex justify-center gap-5 m-5">
      <div className="flex gap-12">
        <button className="flex items-center bg-gray-800 text-gray-100 rounded-2xl w-[300px] h-[100px] border-none cursor-pointer transition-colors duration-300 ease-in-out overflow-hidden relative p-2.5 justify-start hover:bg-gray-700">
          <div className="flex flex-col items-start justify-center flex-1 pr-2.5">
            <h4 className="text-base font-bold m-0">Software</h4>
            <p className="text-xs m-0 mt-1.5 text-gray-100">Herramientas para desarrolladores y diseñadores</p>
          </div>
          <img src={Software} alt="Software" className="h-full w-[35%] object-cover rounded-2xl ml-2.5" />
        </button>

        <button className="flex items-center bg-gray-800 text-gray-100 rounded-2xl w-[300px] h-[100px] border-none cursor-pointer transition-colors duration-300 ease-in-out overflow-hidden relative p-2.5 justify-start hover:bg-gray-700">
          <div className="flex flex-col items-start justify-center flex-1 pr-2.5">
            <h4 className="text-base font-bold m-0">Plantillas Frontend</h4>
            <p className="text-xs m-0 mt-1.5 text-gray-100">Listas para usar y personalizar</p>
          </div>
          <img src={Plantillas} alt="Plantillas" className="h-full w-[35%] object-cover rounded-2xl ml-2.5" />
        </button>

        <button className="flex items-center bg-grisOscuro text-gray-100 rounded-2xl w-[300px] h-[100px] border-none cursor-pointer transition-colors duration-300 ease-in-out overflow-hidden relative p-2.5 justify-start hover:bg-gray-700">
          <div className="flex flex-col items-start justify-center flex-1 pr-2.5">
            <h4 className="text-base font-bold m-0">Hardware</h4>
            <p className="text-xs m-0 mt-1.5 text-gray-100">Componentes y dispositivos de alta calidad</p>
          </div>
          <img src={Hardware} alt="Hardware" className="h-full w-[35%] object-cover rounded-2xl ml-2.5" />
        </button>
      </div>
    </div>
  );
};

export default Shortcut;