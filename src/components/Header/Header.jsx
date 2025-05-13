// Importación de imágenes
import producto1 from '../../assets/coding-screen.jpg';
import producto2 from '../../assets/hard-disk.jpg'; // Ya está siendo usado en la sección "Hardware"
import producto3 from '../../assets/btnPlan.jpg';

const Header = () => {
    return (
        // Contenedor principal con diseño responsivo: columna en móvil, fila en pantallas medianas en adelante
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-[40px] mx-auto md:ml-14 max-w-7xl">
            
            {/* Columna izquierda: Software + Hardware */}
            <div className="flex flex-col flex-1 gap-4 min-w-0 md:min-w-[250px] md:max-w-[500px]">
                
                {/* Tarjeta de Software */}
                <div className="relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform">
                    {/* Título encima de la imagen */}
                    <div className="absolute bottom-5 left-5 z-10 text-white text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
                        Software
                    </div>
                    
                    {/* Imagen con overlay */}
                    <div className="relative w-full aspect-video">
                        <img 
                            src={producto1} 
                            alt="Software" 
                            className="w-full h-full object-cover rounded-[30px]" 
                        />
                        {/* Capa oscura para contraste de texto */}
                        <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                    </div>
                </div>

                {/* Tarjeta de Hardware */}
                <div className="relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform">
                    {/* Título encima de la imagen */}
                    <div className="absolute bottom-5 left-5 z-10 text-white text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
                        Hardware
                    </div>

                    {/* Imagen con overlay */}
                    <div className="relative w-full aspect-video">
                        <img 
                            src={producto2} 
                            alt="Hardware" 
                            className="w-full h-full object-cover rounded-[30px]" 
                        />
                        {/* Capa oscura */}
                        <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                    </div>
                </div>
            </div>

            {/* Columna derecha: Plantillas */}
            <div className="flex-1 min-w-0 md:min-w-[250px] md:max-w-[500px] relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform">
                
                {/* Título de la tarjeta */}
                <div className="absolute bottom-5 left-5 z-10 text-white text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]">
                    Plantillas
                </div>

                {/* Imagen cuadrada con overlay */}
                <div className="relative w-full h-full md:aspect-square">
                    <img 
                        src={producto3} 
                        alt="Plantillas" 
                        className="w-full h-full object-cover rounded-[30px]" 
                    />
                    <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;
