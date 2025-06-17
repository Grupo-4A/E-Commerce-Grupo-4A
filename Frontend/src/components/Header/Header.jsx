// Importación de imágenes
import producto1 from '../../assets/coding-screen.jpg';
import producto2 from '../../assets/hard-disk.jpg';
import producto3 from '../../assets/btnPlan.jpg';

const Header = () => {
    return (
        // Contenedor principal con diseño responsivo
        <div className="container mx-auto flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-8 rounded-[40px] max-w-7xl">
            
            {/* Columna izquierda: Software + Hardware */}
            <div className="flex flex-col flex-1 gap-4 min-w-0 max-w-[500px]">
                
                {/* Tarjeta de Software */}
                <div className="relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300 ease-in-out">
                    {/* Título encima de la imagen */}
                    <div className="absolute bottom-4 left-4 z-10 text-white text-lg sm:text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] truncate">
                        Software
                    </div>
                    
                    {/* Imagen con overlay */}
                    <div className="relative w-full aspect-video">
                        <img 
                            src={producto1} 
                            alt="Software" 
                            aria-label="Software product preview"
                            className="w-full h-full object-cover rounded-[30px]" 
                        />
                        {/* Capa oscura para contraste de texto */}
                        <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                    </div>
                </div>

                {/* Tarjeta de Hardware */}
                <div className="relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300 ease-in-out">
                    {/* Título encima de la imagen */}
                    <div className="absolute bottom-4 left-4 z-10 text-white text-lg sm:text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] truncate">
                        Hardware
                    </div>

                    {/* Imagen con overlay */}
                    <div className="relative w-full aspect-video">
                        <img 
                            src={producto2} 
                            alt="Hardware" 
                            aria-label="Hardware product preview"
                            className="w-full h-full object-cover rounded-[30px]" 
                        />
                        {/* Capa oscura */}
                        <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                    </div>
                </div>
            </div>

            {/* Columna derecha: Plantillas */}
            <div className="flex-1 min-w-0 max-w-[500px] relative overflow-hidden rounded-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300 ease-in-out">
                
                {/* Título de la tarjeta */}
                <div className="absolute bottom-4 left-4 z-10 text-white text-lg sm:text-xl md:text-2xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.7)] truncate">
                    Plantillas
                </div>

                {/* Imagen cuadrada con overlay */}
                <div className="relative w-full aspect-square">
                    <img 
                        src={producto3} 
                        alt="Plantillas" 
                        aria-label="Templates product preview"
                        className="w-full h-full object-cover rounded-[30px]" 
                    />
                    <div className="absolute inset-0 bg-black/60 z-[1] rounded-[30px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;